import { Text } from "mdast";
import { Handler, OrphansRemoverFactory } from "../types";
import defaultHandlers from "./handlers";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const visit = require("unist-util-visit");

const createOrphansRemover: OrphansRemoverFactory = (locale, options = {}) => {
  let handlers: Handler[] = [];

  if (!options.disableBuiltInHandlers && defaultHandlers[locale]) {
    handlers = handlers.concat(defaultHandlers[locale]);
  }

  if (options.customHandlers && options.customHandlers[locale]) {
    handlers = handlers.concat(options.customHandlers[locale]);
  }

  return {
    locale,
    handlers,
    execute(markdownAST) {
      if (this.handlers.length === 0) return;

      visit(markdownAST, "text", (node: Text) => {
        this.handlers.forEach((handler) => {
          const matches = Array.from(
            node.value.matchAll(handler.regex),
            (m) => m[0]
          );
          const uniqueMatches = Array.from(new Set(matches));

          for (const match of uniqueMatches) {
            const regex = new RegExp(`${match.replace(".", "[.]")}`, "g");
            const newVal = handler.replacer(match);

            node.value = node.value.replace(regex, newVal);
          }
        });
      });
    },
  };
};

export default createOrphansRemover;
