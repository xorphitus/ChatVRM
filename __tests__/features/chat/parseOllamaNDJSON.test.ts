import { parseOllamaChunks } from "@/features/chat/parseOllamaNDJSON";

describe("parseOllamaChunks", () => {
  it("parses a single JSON chunk", () => {
    const data = '{"message":{"content":"Hello"}}';
    expect(parseOllamaChunks(data)).toEqual(["Hello"]);
  });

  it("parses multiple chunks separated by data:", () => {
    const data =
      '{"message":{"content":"Hello"}}data:{"message":{"content":" world"}}';
    expect(parseOllamaChunks(data)).toEqual(["Hello", " world"]);
  });

  it("filters [DONE] marker", () => {
    const data = '{"message":{"content":"Hello"}}data:[DONE]';
    expect(parseOllamaChunks(data)).toEqual(["Hello"]);
  });

  it("filters [DONE] marker with whitespace", () => {
    const data = '{"message":{"content":"Hello"}}data: [DONE] ';
    expect(parseOllamaChunks(data)).toEqual(["Hello"]);
  });

  it("skips empty content", () => {
    const data = '{"message":{"content":""}}';
    expect(parseOllamaChunks(data)).toEqual([]);
  });

  it("handles data: prefix at start", () => {
    const data = 'data:{"message":{"content":"Hi"}}';
    expect(parseOllamaChunks(data)).toEqual(["Hi"]);
  });

  it("parses Japanese content", () => {
    const data = '{"message":{"content":"こんにちは"}}';
    expect(parseOllamaChunks(data)).toEqual(["こんにちは"]);
  });

  it("throws on invalid JSON", () => {
    const data = "not json";
    expect(() => parseOllamaChunks(data)).toThrow();
  });
});
