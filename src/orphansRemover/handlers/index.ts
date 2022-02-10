import { Handler } from "../../types";
import polishHandlers from "./handlers.pl";

const handlers: Record<string, Handler[]> = {
  pl: polishHandlers,
};

export default handlers;
