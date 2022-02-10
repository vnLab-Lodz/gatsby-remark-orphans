import { LocaleResolver } from "../types";

const defaultLocaleResolver: LocaleResolver = (markdownNode) => {
  const { fields, frontmatter } = markdownNode;
  const locale = fields.locale || frontmatter.locale;
  return locale;
};

export default defaultLocaleResolver;
