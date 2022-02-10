import { LocaleResolver, LocaleResolverFactory, MarkdownNode } from "../types";
import defaultLocaleResolver from "./localeResolver";

const createLocaleResolver: LocaleResolverFactory = (options = {}) => {
  const { customLocaleResolver, disableDefaultLocaleResolver } = options;

  if (customLocaleResolver) {
    const composedResolver: LocaleResolver = (markdownNode) => {
      let locale = customLocaleResolver(markdownNode);

      if (!locale && !disableDefaultLocaleResolver) {
        locale = defaultLocaleResolver(markdownNode);
      }

      return locale;
    };

    return composedResolver;
  }

  return defaultLocaleResolver;
};

export default createLocaleResolver;
