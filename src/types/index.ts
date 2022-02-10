import { Root } from "mdast";

//#region Plugin types

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

export type Options = LocaleResolverFactoryOptions &
  OrphansRemoverFactoryOptions & {
    silenceReporting?: boolean;
  };

//#endregion

//#region Locale resolver types

export type LocaleResolver = (markdownNode: MarkdownNode) => string | undefined;

export interface LocaleResolverFactoryOptions {
  disableDefaultLocaleResolver?: boolean;
  customLocaleResolver?: LocaleResolver;
}

export type LocaleResolverFactory = (
  options?: LocaleResolverFactoryOptions
) => LocaleResolver;

//#endregion

//#region Orphans handler types

export interface Handler {
  regex: RegExp;
  replacer: (match: string) => string;
}

export interface OrphansRemover {
  locale: string;
  handlers: Handler[];
  execute: (markdownAST: Root) => void;
}

export interface OrphansRemoverFactoryOptions {
  disableBuiltInHandlers?: boolean;
  customHandlers?: Record<string, Handler[]>;
}

export type OrphansRemoverFactory = (
  locale: string,
  options?: OrphansRemoverFactoryOptions
) => OrphansRemover;

//#endregion
