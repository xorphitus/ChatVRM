import { reduceTalkStyle } from "@/utils/reduceTalkStyle";

describe("reduceTalkStyle", () => {
  it('returns "talk" for "talk"', () => {
    expect(reduceTalkStyle("talk")).toBe("talk");
  });

  it('returns "happy" for "happy"', () => {
    expect(reduceTalkStyle("happy")).toBe("happy");
  });

  it('returns "sad" for "sad"', () => {
    expect(reduceTalkStyle("sad")).toBe("sad");
  });

  it('returns "talk" for "angry"', () => {
    expect(reduceTalkStyle("angry")).toBe("talk");
  });

  it('returns "talk" for "fear"', () => {
    expect(reduceTalkStyle("fear")).toBe("talk");
  });

  it('returns "talk" for "surprised"', () => {
    expect(reduceTalkStyle("surprised")).toBe("talk");
  });

  it('returns "talk" for any unknown string', () => {
    expect(reduceTalkStyle("unknown")).toBe("talk");
    expect(reduceTalkStyle("")).toBe("talk");
  });
});
