import { hello } from ".";

describe("hello", () => {
  it("should return 'Hello world!'", () => {
    expect(hello()).toBe("Hello world!");
  });
});
