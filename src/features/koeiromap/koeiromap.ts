import { TalkStyle } from "../messages/messages";

const VOICEVOX_URL = "http://localhost:50021";

export async function synthesizeVoice(
  message: string,
  speaker_x: number,
  speaker_y: number,
  style: TalkStyle,
) {
  const param = {
    method: "POST",
  };

  const queryParams = new URLSearchParams();
  queryParams.append("speaker", String(Math.ceil(speaker_x)));
  queryParams.append("text", message);

  const koeiroRes = await fetch(
    `${VOICEVOX_URL}/audio_query?${queryParams.toString()}`,
    param,
  );

  const data = (await koeiroRes.json()) as any;

  const synthParams = new URLSearchParams();
  synthParams.append("speaker", String(Math.ceil(speaker_x)));

  return {
    url: `${VOICEVOX_URL}/synthesis?${synthParams.toString()}`,
    params: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  };
}
