import { arrayChunk } from "@/lib/VRMAnimation/utils/arrayChunk";

describe("arrayChunk", () => {
  it("chunks array into pairs", () => {
    expect(arrayChunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it("handles remainder when array length is not divisible", () => {
    expect(arrayChunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("chunks with size 1", () => {
    expect(arrayChunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("returns empty array for empty input", () => {
    expect(arrayChunk([], 2)).toEqual([]);
  });

  it("returns single chunk when chunk size exceeds array length", () => {
    expect(arrayChunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  it("chunks into triples", () => {
    expect(arrayChunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});
