import { Handler } from "../types";
import createOrphansRemover from "./orphansRemoverFactory";
import preMdAST from "../mocks/mdAST";
import postMdAST from "../mocks/correctedMdAST";
import { Root } from "mdast";

const handler: Handler = {
  regex: /\s+/,
  replacer: (match) => match.trim(),
};

const customHandlers: Record<string, Handler[]> = {
  en: [handler],
  pl: [handler],
};

describe("createOrphansRemover", () => {
  it("returns remover with no handlers for missing locale", () => {
    const remover = createOrphansRemover("en");

    expect(remover.locale).toBe("en");
    expect(remover.handlers).toHaveLength(0);
  });

  it("returns remover with built in handlers for supported locale", () => {
    const remover = createOrphansRemover("pl");

    expect(remover.locale).toBe("pl");
    expect(remover.handlers).toHaveLength(7);
  });

  it("returns remover with custom handlers for supported locale", () => {
    const remover = createOrphansRemover("en", { customHandlers });

    expect(remover.locale).toBe("en");
    expect(remover.handlers).toHaveLength(1);
  });

  it("returns remover with custom and default handlers for supported locale", () => {
    const remover = createOrphansRemover("pl", { customHandlers });

    expect(remover.locale).toBe("pl");
    expect(remover.handlers).toHaveLength(8);
  });

  it("returns remover with custom handlers only if disableBuiltInHandlers is specified", () => {
    const remover = createOrphansRemover("pl", {
      customHandlers,
      disableBuiltInHandlers: true,
    });

    expect(remover.locale).toBe("pl");
    expect(remover.handlers).toHaveLength(1);
  });
});

describe("orphansRemover", () => {
  it("correctly removes orphans in text", () => {
    const remover = createOrphansRemover("pl");

    const markdownAST = preMdAST;
    remover.execute(markdownAST as Root);
    expect(markdownAST.children[0].children[0].value).toBe(
      postMdAST.children[0].children[0].value
    );
  });
});
