import localeResolver from "./localeResolver";

describe("localeResolver", () => {
  it("returns undefined if locale could not be found", () => {
    expect(localeResolver({ fields: {}, frontmatter: {} })).toBeUndefined();
  });

  it("returns locale from fields property", () => {
    expect(localeResolver({ fields: { locale: "en" }, frontmatter: {} })).toBe(
      "en"
    );
  });

  it("returns locale from frontmatter", () => {
    expect(localeResolver({ fields: {}, frontmatter: { locale: "en" } })).toBe(
      "en"
    );
  });
});
