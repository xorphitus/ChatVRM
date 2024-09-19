import { VRMExpressionPresetName } from "@pixiv/three-vrm";
import { VoicevoxParam } from "../constants/voicevoxParam";

// Ollama API
export type Message = {
  role: "assistant" | "system" | "user";
  content: string;
};

const talkStyles = [
  "talk",
  "happy",
  "sad",
  "angry",
  "fear",
  "surprised",
] as const;
export type TalkStyle = (typeof talkStyles)[number];

export type Talk = {
  style: TalkStyle;
  speaker: number;
  message: string;
};

const emotions = ["neutral", "happy", "angry", "sad", "relaxed"] as const;
type EmotionType = (typeof emotions)[number] & VRMExpressionPresetName;

/**
 * 発話文と音声の感情と、モデルの感情表現がセットになった物
 */
export type Screenplay = {
  expression: EmotionType;
  talk: Talk;
};

export const parseMessage = (message: string) => {
  const tagMatch = message.match(/^\[(.*?)]/);
  let tag = "";
  let body = "";
  if (tagMatch && tagMatch[0]) {
    tag = tagMatch[0];
    body = message.slice(tag.length);
  }

  return { tag, body };
};

export const trimUnpronounceableCharacters = (message: string) => {
  return message.replace(
    /^[\s\[({「［（【『〈《〔｛«‹〘〚〛〙›»〕》〉』】）］」})\]]+$/g,
    "",
  );
};

export const matchSentence = (message: string): string => {
  const match = message.match(/^(.+[。．！？\n]|.{10,}[、,])/);
  return match ? match[0] : "";
};

export const textsToScreenplay = (
  texts: string[],
  voicevoxParam: VoicevoxParam,
): Screenplay[] => {
  const screenplays: Screenplay[] = [];
  let prevExpression = "neutral";
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];

    const match = text.match(/\[(.*?)]/);

    const tag = (match && match[1]) || prevExpression;

    const message = text.replace(/\[(.*?)]/g, "");

    let expression = prevExpression;
    if (emotions.includes(tag as any)) {
      expression = tag;
      prevExpression = tag;
    }

    screenplays.push({
      expression: expression as EmotionType,
      talk: {
        style: emotionToTalkStyle(expression as EmotionType),
        speaker: voicevoxParam.speaker,
        message: message,
      },
    });
  }

  return screenplays;
};

const emotionToTalkStyle = (emotion: EmotionType): TalkStyle => {
  switch (emotion) {
    case "angry":
      return "angry";
    case "happy":
      return "happy";
    case "sad":
      return "sad";
    default:
      return "talk";
  }
};
