import { Message } from "../messages/messages";

const OLLAMA_URL = "http://localhost:11434/api/chat"

export async function getChatResponseStream(
  messages: Message[],
  apiKey: string
) {
  if (!apiKey) {
    throw new Error("Invalid API Key");
  }

  // TODO temporary work around
  const model = apiKey;

  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  const reader = res.body?.getReader();
  if (res.status !== 200 || !reader) {
    throw new Error("Something went wrong");
  }

  const stream = new ReadableStream({
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

  return stream;
}
