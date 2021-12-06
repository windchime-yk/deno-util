import { assertEquals } from "../deps.ts";
import { TEXT } from "./worker.ts";

new Worker(new URL("./worker.ts", import.meta.url).href, {
  type: "module",
});

Deno.test({
  name: "Server Launch Test",
  fn: async () => {
    const response = await fetch("http://localhost:8080");
    assertEquals(await response.text(), TEXT);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
