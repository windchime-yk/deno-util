import {
  ensureDir,
  isExistFile,
  Prompt,
  readDate,
  resolve,
  writeFile,
  zeroPadding,
} from "./deps.ts";
import type { Answers, ConnpassEvent } from "./model.ts";

export const answers = await Prompt.prompts<Answers>([
  {
    type: "number",
    name: "count",
    message: "開催回数",
  },
  {
    type: "text",
    name: "datetime",
    message: "開催日",
    validate(result: string) {
      if (!/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/.test(result)) {
        throw new Error("xxxx/xx/xxという形式で入力してください");
      }
    },
  },
]);

export const template = async ({ count, datetime }: Answers) => {
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
  const eventData = await fetch(
    `https://connpass.com/api/v1/event/?keyword=${encodeURIComponent(title)}`,
  );
  const connpassEvent: ConnpassEvent = await eventData.json();

  return template
    .replaceAll("{{title}}", title)
    .replaceAll("{{year}}", year.toString())
    .replaceAll("{{month}}", month.toString())
    .replaceAll("{{date}}", date.toString())
    .replaceAll("{{link}}", connpassEvent.events[0].event_url)
    .replaceAll("{{slide_url}}", slideUrl);
};

export const generateNewReport = async (template: string, count: number) => {
  const dirname = resolve(Deno.cwd(), "docs/report");
  const filename = `${dirname}/${zeroPadding(count, 2)}.md`;
  if (!(await isExistFile(filename))) {
    await ensureDir(dirname);
    await writeFile(template, filename);
    console.log(`新規レポートの作成が完了しました`);
  } else throw new Error("既に存在しているファイルです");
};
