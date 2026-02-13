import { calculateVolume } from "@/features/lipSync/volumeAnalysis";

describe("calculateVolume", () => {
  it("returns 0 for silence (all zeros)", () => {
    const data = new Float32Array(2048);
    expect(calculateVolume(data)).toBe(0);
  });

  it("returns 0 for very small amplitudes", () => {
    const data = new Float32Array(2048);
    data[0] = 0.01;
    // sigmoid(1/(1+exp(-45*0.01+5))) = 1/(1+exp(4.55)) ≈ 0.0104 < 0.1
    expect(calculateVolume(data)).toBe(0);
  });

  it("returns positive value for loud signal", () => {
    const data = new Float32Array(2048);
    data[0] = 1.0;
    // sigmoid(1/(1+exp(-45*1+5))) = 1/(1+exp(-40)) ≈ 1.0
    const volume = calculateVolume(data);
    expect(volume).toBeGreaterThan(0.9);
    expect(volume).toBeLessThanOrEqual(1);
  });

  it("uses max absolute amplitude across all samples", () => {
    const data = new Float32Array(2048);
    data[100] = -0.5;
    data[200] = 0.3;
    // Max abs is 0.5: sigmoid(1/(1+exp(-45*0.5+5))) = 1/(1+exp(-17.5)) ≈ 1.0
    const volume = calculateVolume(data);
    expect(volume).toBeGreaterThan(0.9);
  });

  it("handles negative amplitudes correctly", () => {
    const data = new Float32Array(2048);
    data[0] = -0.8;
    const volume = calculateVolume(data);
    expect(volume).toBeGreaterThan(0);
  });

  it("returns value near threshold boundary", () => {
    // Find amplitude where sigmoid output is near 0.1
    // 1/(1+exp(-45v+5)) = 0.1 → exp(-45v+5) = 9 → -45v+5 = ln(9) ≈ 2.197
    // v ≈ (5-2.197)/45 ≈ 0.0623
    const data = new Float32Array(2048);
    data[0] = 0.062;
    // Should be just below 0.1 threshold
    expect(calculateVolume(data)).toBe(0);

    data[0] = 0.065;
    // Should be just above 0.1 threshold
    expect(calculateVolume(data)).toBeGreaterThan(0);
  });

  it("handles empty Float32Array", () => {
    const data = new Float32Array(0);
    // volume stays 0, sigmoid(1/(1+exp(5))) ≈ 0.0067 < 0.1 → 0
    expect(calculateVolume(data)).toBe(0);
  });
});
