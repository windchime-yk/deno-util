import { generateNewReport } from "./scripts/generate-new-report.ts";

const [subcommand] = Deno.args;

if (subcommand === "dcr") {
  await generateNewReport();
}
