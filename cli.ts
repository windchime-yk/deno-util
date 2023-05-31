import {
  answers,
  generateNewReport,
  template,
} from "./scripts/generate-new-report.ts";

const [subcommand] = Deno.args;

if (subcommand === "dcr") {
  await generateNewReport(
    await template({
      count: answers.count,
      datetime: answers.datetime,
      link: answers.link,
    }),
    answers.count,
  );
}
