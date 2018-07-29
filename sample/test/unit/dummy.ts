import { foo } from "../../src";

describe("Hello function", () => {
  it("should return hello world", () => {
    expect(typeof foo).toEqual("function");
  });
});
