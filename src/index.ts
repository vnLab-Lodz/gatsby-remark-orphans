import createLocaleResolver from "./localeResolver/localeResolverFactory";
import { Params, Options } from "./types";

export = function (params: Params, options: Options) {
  const { markdownAST, markdownNode, reporter } = params;

  const resolveLocale = createLocaleResolver({
    customLocaleResolver: options.customLocaleResolver,
    disableDefaultLocaleResolver: options.disableDefaultLocaleResolver,
  });

  const locale = resolveLocale(markdownNode);
  if (locale === undefined) {
    reporter.warn(
      `[gatsby-remark-orphans]: No locale found for markdown node (id: ${markdownNode.id}).`
    );
    return markdownAST;
  }

  return markdownAST;
};
