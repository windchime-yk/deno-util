import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    fmt: {
      cmd: "deno fmt --ignore=README.md,./.github/,.vscode/",
      watch: false,
    },
  },
};

export default config;
