import { Message } from "../messages/messages";
import { OLLAMA_URL } from "@/constants/api";

export async function getChatResponseStream(
  messages: Message[],
  model: string,
) {
  if (!model) {
    throw new Error("LLM model is not set");
  }

  const res = await fetch(OLLAMA_URL + "/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      // Disable stream in Tauri
      // See https://github.com/tauri-apps/tauri/discussions/6613
      stream: !(window as any).__TAURI_INTERNALS__,
    }),
  });

  const reader = res.body?.getReader();
  if (res.status !== 200 || !reader) {
    throw new Error("Something went wrong");
  }

  return new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      const decoder = new TextDecoder("utf-8");
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const data = decoder.decode(value);
          const chunks = data
            .split("data:")
            .filter((val) => !!val && val.trim() !== "[DONE]");
          for (const chunk of chunks) {
            const json = JSON.parse(chunk);
            const messagePiece = json.message.content;
            if (!!messagePiece) {
              controller.enqueue(messagePiece);
            }
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
        controller.close();
      }
    },
  });
}
