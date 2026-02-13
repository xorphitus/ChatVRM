import {
  extractEmotionTag,
  extractSentence,
  isSpeakable,
} from "@/features/chat/streamProcessor";

describe("extractEmotionTag", () => {
  it("extracts a leading emotion tag", () => {
    const result = extractEmotionTag("[happy]こんにちは");
    expect(result.tag).toBe("[happy]");
    expect(result.remaining).toBe("こんにちは");
  });

  it("returns empty tag when no tag is present", () => {
    const result = extractEmotionTag("こんにちは");
    expect(result.tag).toBe("");
    expect(result.remaining).toBe("こんにちは");
  });

  it("only extracts tag at the beginning", () => {
    const result = extractEmotionTag("テスト[happy]です");
    expect(result.tag).toBe("");
    expect(result.remaining).toBe("テスト[happy]です");
  });

  it("extracts neutral tag", () => {
    const result = extractEmotionTag("[neutral]普通の会話");
    expect(result.tag).toBe("[neutral]");
    expect(result.remaining).toBe("普通の会話");
  });

  it("handles empty string", () => {
    const result = extractEmotionTag("");
    expect(result.tag).toBe("");
    expect(result.remaining).toBe("");
  });

  it("handles tag-only string", () => {
    const result = extractEmotionTag("[sad]");
    expect(result.tag).toBe("[sad]");
    expect(result.remaining).toBe("");
  });
});

describe("extractSentence", () => {
  it("splits at 。 (greedy: matches to last sentence-ender)", () => {
    // The regex is greedy, so when multiple sentence-enders exist,
    // it matches the longest possible string
    const result = extractSentence("こんにちは。元気ですか？");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("こんにちは。元気ですか？");
    expect(result!.remaining).toBe("");
  });

  it("splits at 。 with trailing non-sentence text", () => {
    const result = extractSentence("こんにちは。元気です");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("こんにちは。");
    expect(result!.remaining).toBe("元気です");
  });

  it("splits at ！", () => {
    const result = extractSentence("すごい！本当に");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("すごい！");
    expect(result!.remaining).toBe("本当に");
  });

  it("splits at ？", () => {
    const result = extractSentence("元気ですか？はい");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("元気ですか？");
    expect(result!.remaining).toBe("はい");
  });

  it("splits at newline", () => {
    const result = extractSentence("一行目\n二行目");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("一行目\n");
    expect(result!.remaining).toBe("二行目");
  });

  it("splits at 、 after 10+ chars", () => {
    // Need 10+ chars before 、: "これはとても長い文章です" = 11 chars
    const result = extractSentence("これはとても長い文章です、残り");
    expect(result).not.toBeNull();
    expect(result!.sentence).toBe("これはとても長い文章です、");
    expect(result!.remaining).toBe("残り");
  });

  it("does not split at 、 with fewer than 10 chars", () => {
    const result = extractSentence("短い、文");
    expect(result).toBeNull();
  });

  it("returns null when no sentence boundary found", () => {
    const result = extractSentence("途中の文");
    expect(result).toBeNull();
  });

  it("handles empty string", () => {
    const result = extractSentence("");
    expect(result).toBeNull();
  });

  it("trims leading whitespace from remaining text", () => {
    const result = extractSentence("はい。  次の文");
    expect(result).not.toBeNull();
    expect(result!.remaining).toBe("次の文");
  });
});

describe("isSpeakable", () => {
  it("returns true for normal text", () => {
    expect(isSpeakable("こんにちは")).toBe(true);
  });

  it("returns false for bracket-only strings", () => {
    expect(isSpeakable("「」")).toBe(false);
  });

  it("returns false for whitespace-only strings", () => {
    expect(isSpeakable("   ")).toBe(false);
  });

  it("returns false for mixed brackets and whitespace", () => {
    expect(isSpeakable(" 「 」 ")).toBe(false);
  });

  it("returns true for text with brackets around it", () => {
    expect(isSpeakable("「テスト」")).toBe(true);
  });

  it("returns false for various bracket types", () => {
    expect(isSpeakable("【】")).toBe(false);
    expect(isSpeakable("『』")).toBe(false);
    expect(isSpeakable("（）")).toBe(false);
    expect(isSpeakable("[]")).toBe(false);
  });
});
