import { ensureDir } from "@std/fs";
import { resolve } from "@std/path";
import { cancel, group, intro, outro, text } from "@clack/prompts";
import { isExistFile, writeFile } from "../file.ts";
import { readDate, zeroPadding } from "../text.ts";
import type { Answers } from "./model.ts";

export const template = async ({ count, datetime, link }: Answers) => {
  const { year, month, date } = readDate({ date: datetime });
  const convertNumber = (text: unknown) =>
    typeof text === "number" ? text : Number(text);
  const convertZeropaddingDate = (date: string | number) =>
    zeroPadding(convertNumber(date), 2);

  const title = `Denoばた会議 Monthly 第${count}回`;
  const slideUrl = `https://uki00a.github.io/slides/denobata-${year}-${
    convertZeropaddingDate(month)
  }-${convertZeropaddingDate(date)}`;

  const templateData = await fetch(new URL("template.txt", import.meta.url));
  const template = await templateData.text();

  return template
    .replaceAll("{{title}}", title)
    .replaceAll("{{year}}", year.toString())
    .replaceAll("{{month}}", month.toString())
    .replaceAll("{{date}}", date.toString())
    .replaceAll("{{link}}", link)
    .replaceAll("{{slide_url}}", slideUrl);
};

export const generateNewReport = async () => {
  intro("Denoばた会議 Monthly レポート作成");
  const prompts = await group(
    {
      count: async () => {
        const count = await text({ message: "開催回数" });
        return Number(count);
      },
      datetime: () =>
        text({
          message: "開催日",
          validate(result) {
            if (!/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/.test(result)) {
              return "xxxx/xx/xxという形式で入力してください";
            }
          },
        }),
      link: () =>
        text({
          message: "connpassリンク( https://deno-ja.connpass.com/event/ )",
          validate(result) {
            if (!/https:\/\/deno-ja\.connpass\.com(\/[^\s]*)?$/.test(result)) {
              return "connpassのURLを貼り付けてください";
            }
          },
        }),
    },
    {
      onCancel: () => {
        cancel("処理が中止されました");
        Deno.exit(1);
      },
    },
  );
  const dirname = resolve(Deno.cwd(), "docs/report");
  const filename = `${dirname}/${zeroPadding(prompts.count, 2)}.md`;
  if (!(await isExistFile(filename))) {
    await ensureDir(dirname);
    const template = async ({ count, datetime }: Answers) => {
      const { year, month, date } = readDate({ date: datetime });
      const convertNumber = (text: unknown) =>
        typeof text === "number" ? text : Number(text);
      const convertZeropaddingDate = (date: string | number) =>
        zeroPadding(convertNumber(date), 2);

      const title = `Denoばた会議 Monthly 第${count}回`;
      const slideUrl = `https://uki00a.github.io/slides/denobata-${year}-${
        convertZeropaddingDate(month)
      }-${convertZeropaddingDate(date)}`;

      const templateData = await fetch(
        new URL("template.txt", import.meta.url),
      );
      const template = await templateData.text();
      return template
        .replaceAll("{{title}}", title)
        .replaceAll("{{year}}", year.toString())
        .replaceAll("{{month}}", month.toString())
        .replaceAll("{{date}}", date.toString())
        .replaceAll("{{link}}", "hogehoge")
        .replaceAll("{{slide_url}}", slideUrl);
    };

    await writeFile(
      await template({
        count: prompts.count,
        datetime: prompts.datetime,
        link: prompts.link,
      }),
      filename,
    );

    outro(`新規レポートの作成が完了しました`);
    Deno.exit(0);
  } else {
    cancel("既に作成されている開催回だったため、作成できませんでした");
    Deno.exit(1);
  }
};
