import { $ } from "@david/dax";
import { parseArgs } from "@std/cli";
import {
  CONFIG_FILE_NAME,
  getJsrVersionConfig,
  mergeConfigFile,
} from "./config.ts";

const args = parseArgs(Deno.args);
const versionTag = args._[0];
if (!versionTag) throw new TypeError("Can't find version tag");
const version = versionTag.toString().replace("v", "");

const config = getJsrVersionConfig(version);
const { mergedConfigFileData } = await mergeConfigFile(config);

const encoder = new TextEncoder();
await Deno.writeFile(
  CONFIG_FILE_NAME,
  encoder.encode(JSON.stringify(mergedConfigFileData)),
);
await $`deno fmt ${CONFIG_FILE_NAME}`.quiet();
$.log(`Created ${CONFIG_FILE_NAME} with ${versionTag}`);
