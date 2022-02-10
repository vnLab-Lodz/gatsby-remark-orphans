import { Handler } from "../../types";

export default [
  {
    // * Linking words
    regex: new RegExp("( |\u00a0)[aiouwzAIOUWZ]( |\u00a0)", "g"),
    replacer: (match) => `${match.slice(0, -1)}\u00a0`,
  },
  {
    // * Multiple linking words
    regex: new RegExp(
      "( |\u00a0)[aiouwzAIOUWZ]( |\u00a0)[aiouwzAIOUWZ]( |\u00a0)",
      "g"
    ),
    replacer: (match) => `${match.slice(0, -1)}\u00a0`,
  },
  {
    // * Acronyms
    regex: new RegExp(
      "( |\u00a0)(p[.]|o[.]|św[.]|dr[.]|prof[.]|np[.]|tj[.]|pt[.]|pn[.]|sz[.])( |\u00a0)",
      "g"
    ),
    replacer: (match) => `${match.slice(0, -1)}\u00a0`,
  },
  {
    // * Units
    regex: new RegExp("( |\u00a0)(r.|w.|m|kg|h|l)( |\u00a0)", "g"),
    replacer: (match) => `\u00a0${match.slice(1, -1)}\u00a0`,
  },
  {
    // * Figures
    regex: new RegExp("( |\u00a0)[1234567890IVXLCDM]( |\u00a0)", "g"),
    replacer: (match) => `\u00a0${match.slice(1, -1)}\u00a0`,
  },
  {
    // * Special characters
    regex: new RegExp("( |\u00a0)[@#&]( |\u00a0)", "g"),
    replacer: (match) => `\u00a0${match.slice(1, -1)}\u00a0`,
  },
  {
    // * Hyphens
    regex: new RegExp("( |\u00a0)(\u2014|\u2013|-)( |\u00a0)", "g"),
    replacer: (match) => `\u00a0${match.slice(1)}`,
  },
] as Handler[];
