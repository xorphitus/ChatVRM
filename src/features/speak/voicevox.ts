import { TalkStyle } from "../messages/messages";
import { VOICEVOX_URL } from "@/constants/api";

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

  const params = styleToParameters(style);
  queryJson["speedScale"] = params.speedScale;
  queryJson["pitchScale"] = params.pitchScale;
  queryJson["intonationScale"] = params.intonationScale;

  return synthesizeVoice(speaker, queryJson);
}

export function styleToParameters(style: TalkStyle) {
  let parameters = {
    speedScale: 1.05,
    pitchScale: 0,
    intonationScale: 1,
  };

  switch (style) {
    case "angry":
      parameters = {
        speedScale: 1.1,
        pitchScale: -0.1,
        intonationScale: 0.8,
      };
      break;
    case "fear":
      parameters = {
        speedScale: 1.3,
        pitchScale: 0.12,
        intonationScale: 1.5,
      };
      break;
    case "surprised":
      parameters = {
        speedScale: 1.3,
        pitchScale: 0.1,
        intonationScale: 1.5,
      };
      break;
    case "happy":
      parameters = {
        speedScale: 1.1,
        pitchScale: 0.07,
        intonationScale: 1.3,
      };
      break;
    case "sad":
      parameters = {
        speedScale: 0.9,
        pitchScale: -0.12,
        intonationScale: 0.9,
      };
      break;
    default:
      break;
  }

  return parameters;
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
