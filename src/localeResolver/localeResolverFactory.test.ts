import { LocaleResolver } from "../types";
import createLocaleResolver from "./localeResolverFactory";

const customLocaleResolver: LocaleResolver = (markdownNode) => {
  return markdownNode.frontmatter.lang;
};

describe("createLocaleResolver", () => {
  it("returns default locale resolver if no options are specified", () => {
    const resolver = createLocaleResolver();

    expect(resolver({ fields: {}, frontmatter: {} })).toBeUndefined();
    expect(resolver({ fields: { locale: "en" }, frontmatter: {} })).toBe("en");
    expect(resolver({ fields: {}, frontmatter: { locale: "en" } })).toBe("en");
  });

  it("returns default resolver if disableDefaultLocaleResolver option is true but no custom resolvers are provided", () => {
    const resolver = createLocaleResolver({
      disableDefaultLocaleResolver: true,
    });

    expect(resolver({ fields: {}, frontmatter: {} })).toBeUndefined();
    expect(resolver({ fields: { locale: "en" }, frontmatter: {} })).toBe("en");
    expect(resolver({ fields: {}, frontmatter: { locale: "en" } })).toBe("en");
  });

  it("returns custom resolver extended by default resolver if customResolver is specified in options", () => {
    const customLocaleResolver: LocaleResolver = (markdownNode) => {
      return markdownNode.frontmatter.lang;
    };

    const resolver = createLocaleResolver({ customLocaleResolver });

    expect(resolver({ fields: {}, frontmatter: { lang: "pl" } })).toBe("pl");
    expect(resolver({ fields: { locale: "en" }, frontmatter: {} })).toBe("en");
  });

  it("returns custom resolver if customResolver and disableLocaleResolver are specified in options", () => {
    const resolver = createLocaleResolver({
      customLocaleResolver,
      disableDefaultLocaleResolver: true,
    });

    expect(resolver({ fields: {}, frontmatter: { lang: "pl" } })).toBe("pl");
    expect(
      resolver({ fields: { locale: "en" }, frontmatter: {} })
    ).toBeUndefined();
  });
});
