/**
 * カクヨムの独自タグ（|《》や《《》》）を対応するタグに変換する
 * @param str 変換したい文字列
 * @param [prefix="util"] class属性の最初につける文字（ex. ns → class="ns-ruby"）
 */
export const kakuyomuOriginalTagConvert = (
  str: string,
  prefix = "util",
): string => {
  const converted = str
    .replace(
      /[|｜](.+?)《(.+?)》/g,
      `<ruby class="${prefix}-ruby">$1<rt>$2</rt></ruby>`,
    )
    .replace(
      /《《(.+?)》》/g,
      `<strong class="${prefix}-emphasis">$1</strong>`,
    );
  return converted;
};

/**
 * 任意の数字を文字に変換し、任意の桁数になるよう先頭に0を追加する
 * @param num 変換したい数字
 */
export const zeroPadding = (num: number, digit: number): string =>
  String(num).padStart(digit, "0");

interface ReadDateOptions {
  date?: string;
  zeropadding?: boolean;
}
export type Days = "日" | "月" | "火" | "水" | "木" | "金" | "土";
interface ReadDateReturnType {
  year: number | string;
  month: number | string;
  date: number | string;
  days: Days;
  hour: number | string;
  minute: number | string;
  second: number | string;
}
/**
 * 日付に関するデータをObjectで返す
 *
 * 日付はデフォルトではnumber、ゼロ詰めするとstringになる
 * 曜日は日〜土の値で返ってくる
 * @param options.date 任意の日付（ex. 2020/12/12）を指定し、なければ今日を使う
 * @param options.zeropadding ゼロ詰めするかどうか
 */
export const readDate = (options?: ReadDateOptions): ReadDateReturnType => {
  const getDate = options?.date ? new Date(options.date) : new Date();
  const daysList: Days[] = ["日", "月", "火", "水", "木", "金", "土"];
  const formatDate = (datetime: number): number | string =>
    options?.zeropadding ? zeroPadding(datetime, 2) : datetime;

  return {
    year: formatDate(getDate.getFullYear()),
    month: formatDate(getDate.getMonth() + 1),
    date: formatDate(getDate.getDate()),
    days: daysList[getDate.getDay()],
    hour: formatDate(getDate.getHours()),
    minute: formatDate(getDate.getMinutes()),
    second: formatDate(getDate.getSeconds()),
  };
};
