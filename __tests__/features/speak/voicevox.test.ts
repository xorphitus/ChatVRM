import { styleToParameters } from "@/features/speak/voicevox";

describe("styleToParameters", () => {
  it("returns default parameters for talk style", () => {
    const params = styleToParameters("talk");
    expect(params).toEqual({
      speedScale: 1.05,
      pitchScale: 0,
      intonationScale: 1,
    });
  });

  it("returns angry parameters", () => {
    const params = styleToParameters("angry");
    expect(params).toEqual({
      speedScale: 1.1,
      pitchScale: -0.1,
      intonationScale: 0.8,
    });
  });

  it("returns fear parameters", () => {
    const params = styleToParameters("fear");
    expect(params).toEqual({
      speedScale: 1.3,
      pitchScale: 0.12,
      intonationScale: 1.5,
    });
  });

  it("returns surprised parameters", () => {
    const params = styleToParameters("surprised");
    expect(params).toEqual({
      speedScale: 1.3,
      pitchScale: 0.1,
      intonationScale: 1.5,
    });
  });

  it("returns happy parameters", () => {
    const params = styleToParameters("happy");
    expect(params).toEqual({
      speedScale: 1.1,
      pitchScale: 0.07,
      intonationScale: 1.3,
    });
  });

  it("returns sad parameters", () => {
    const params = styleToParameters("sad");
    expect(params).toEqual({
      speedScale: 0.9,
      pitchScale: -0.12,
      intonationScale: 0.9,
    });
  });
});
