import createLocaleResolver from "./localeResolver/localeResolverFactory";
import createOrphansRemover from "./orphansRemover/orphansRemoverFactory";
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

  const orphansRemover = createOrphansRemover(locale, {
    customHandlers: options.customHandlers,
    disableBuiltInHandlers: options.disableBuiltInHandlers,
  });

  if (orphansRemover.handlers.length === 0) {
    reporter.warn(
      `[gatsby-remark-orphans]: No handlers found for locale "${locale}". Skipping orphans removal for markdown node (id: ${markdownNode.id}).`
    );
    return markdownAST;
  }

  orphansRemover.execute(markdownAST);

  return markdownAST;
};
