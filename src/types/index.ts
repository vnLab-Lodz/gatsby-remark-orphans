import { Root } from "mdast";

export interface MarkdownNode {
  fields: { locale?: string; [key: string]: any };
  frontmatter: { locale?: string; [key: string]: any };
  [key: string]: any;
}

export interface Params {
  markdownAST: Root;
  markdownNode: MarkdownNode;
  reporter: {
    error: (message: string) => void;
    info: (message: string) => void;
    warn: (message: string) => void;
  };
}

export type Options = LocaleResolverFactoryOptions;

export type LocaleResolver = (markdownNode: MarkdownNode) => string | undefined;

export interface LocaleResolverFactoryOptions {
  disableDefaultLocaleResolver?: boolean;
  customLocaleResolver?: LocaleResolver;
}

export type LocaleResolverFactory = (
  options?: LocaleResolverFactoryOptions
) => LocaleResolver;
