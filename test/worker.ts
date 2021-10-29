import { simpleServer } from "../server.ts";

export const TEXT = "Hello, World!!";
simpleServer({ response: new Response(TEXT) });
