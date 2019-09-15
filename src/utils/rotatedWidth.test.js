import rotatedWidth from "./rotatedWidth";

describe("rotatedWidth", () => {
  it("is the side size if there is no rotation", () => {
    expect(rotatedWidth(10, 0)).toBeCloseTo(10);
  });

  it("is the diagonal size if it's rotated by 45º", () => {
    const side = 10;
    const diagonal = Math.sqrt(Math.pow(side, 2) * 2);
    expect(rotatedWidth(side, 45)).toBeCloseTo(diagonal);
  });

  it("is the side size if it's rotated by 90º", () => {
    expect(rotatedWidth(10, 90)).toBeCloseTo(10);
  });

  it("is the diagonal size if it's rotated by 135º", () => {
    const side = 10;
    const diagonal = Math.sqrt(Math.pow(side, 2) * 2);
    expect(rotatedWidth(side, 135)).toBeCloseTo(diagonal);
  });

  it("is the diagonal size if it's rotated by -45º", () => {
    const side = 10;
    const diagonal = Math.sqrt(Math.pow(side, 2) * 2);
    expect(rotatedWidth(side, -45)).toBeCloseTo(diagonal);
  });

  it("is the side size if it's rotated by -90º", () => {
    expect(rotatedWidth(10, -90)).toBeCloseTo(10);
  });
});
