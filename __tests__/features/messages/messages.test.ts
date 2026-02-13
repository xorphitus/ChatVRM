import {
  textsToScreenplay,
  emotionToTalkStyle,
} from "@/features/messages/messages";
import { VoicevoxParam } from "@/features/constants/voicevoxParam";

const defaultParam: VoicevoxParam = { speaker: 0 };

describe("textsToScreenplay", () => {
  it("parses a single text with [happy] tag", () => {
    const result = textsToScreenplay(["[happy]こんにちは"], defaultParam);

    expect(result).toHaveLength(1);
    expect(result[0].expression).toBe("happy");
    expect(result[0].talk.style).toBe("happy");
    expect(result[0].talk.message).toBe("こんにちは");
    expect(result[0].talk.speaker).toBe(0);
  });

  it("parses multiple texts with different tags", () => {
    const result = textsToScreenplay(
      ["[happy]嬉しい", "[sad]悲しい", "[angry]怒った"],
      defaultParam,
    );

    expect(result).toHaveLength(3);
    expect(result[0].expression).toBe("happy");
    expect(result[1].expression).toBe("sad");
    expect(result[2].expression).toBe("angry");
  });

  it("defaults to neutral when no tag is present", () => {
    const result = textsToScreenplay(["こんにちは"], defaultParam);

    expect(result).toHaveLength(1);
    expect(result[0].expression).toBe("neutral");
    expect(result[0].talk.style).toBe("talk");
  });

  it("keeps previous expression for unknown tags", () => {
    const result = textsToScreenplay(
      ["[happy]嬉しい", "[excited]わくわく"],
      defaultParam,
    );

    expect(result[0].expression).toBe("happy");
    // "excited" is not a valid emotion, so previous "happy" persists
    expect(result[1].expression).toBe("happy");
  });

  it("carries forward emotion to tagless texts", () => {
    const result = textsToScreenplay(
      ["[happy]嬉しい", "まだ嬉しい"],
      defaultParam,
    );

    expect(result[0].expression).toBe("happy");
    expect(result[1].expression).toBe("happy");
    expect(result[1].talk.style).toBe("happy");
  });

  it("strips tags from talk.message", () => {
    const result = textsToScreenplay(["[angry]怒りの言葉"], defaultParam);

    expect(result[0].talk.message).toBe("怒りの言葉");
  });

  it("passes speaker number through from VoicevoxParam", () => {
    const param: VoicevoxParam = { speaker: 5 };
    const result = textsToScreenplay(["[neutral]テスト"], param);

    expect(result[0].talk.speaker).toBe(5);
  });

  it("handles empty array", () => {
    const result = textsToScreenplay([], defaultParam);
    expect(result).toHaveLength(0);
  });

  it("maps relaxed expression to talk style", () => {
    const result = textsToScreenplay(["[relaxed]リラックス"], defaultParam);

    expect(result[0].expression).toBe("relaxed");
    expect(result[0].talk.style).toBe("talk");
  });
});

describe("emotionToTalkStyle", () => {
  it('maps "angry" to "angry"', () => {
    expect(emotionToTalkStyle("angry")).toBe("angry");
  });

  it('maps "happy" to "happy"', () => {
    expect(emotionToTalkStyle("happy")).toBe("happy");
  });

  it('maps "sad" to "sad"', () => {
    expect(emotionToTalkStyle("sad")).toBe("sad");
  });

  it('maps "neutral" to "talk"', () => {
    expect(emotionToTalkStyle("neutral")).toBe("talk");
  });

  it('maps "relaxed" to "talk"', () => {
    expect(emotionToTalkStyle("relaxed")).toBe("talk");
  });
});
