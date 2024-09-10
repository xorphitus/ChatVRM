import { TalkStyle } from "../messages/messages";

const VOICEVOX_URL = "http://localhost:50021";

export async function fetchVoice(
  message: string,
  speaker: number,
  style: TalkStyle,
) {
  const query = await queryVoice(message, speaker);
  if (!query.ok) {
    throw new Error("Something went wrong");
  }

  const queryJson = await query.json();

  return synthesizeVoice(speaker, queryJson);
}

async function queryVoice(message: string, speaker: number) {
  const param = {
    method: "POST",
  };

  const queryParams = new URLSearchParams();
  queryParams.append("speaker", String(Math.ceil(speaker)));
  queryParams.append("text", message);

  return await fetch(
    `${VOICEVOX_URL}/audio_query?${queryParams.toString()}`,
    param,
  );
}

async function synthesizeVoice(speaker: number, query: {}) {
  const synthParams = new URLSearchParams();
  synthParams.append("speaker", String(Math.ceil(speaker)));
  const resAudio = await fetch(
    `${VOICEVOX_URL}/synthesis?${synthParams.toString()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    },
  );

  if (!resAudio.ok) {
    throw new Error("Something went wrong");
  }

  return await resAudio.arrayBuffer();
}
