/**
 * Objectの配列から、特定のkeyの値を配列として抽出する
 * @param arr Objectの配列
 * @param key 配列として取得したいkey
 */
export const extractObjectValue = <T>(arr: T[], key: keyof T): T[keyof T][] =>
  arr.map((item) => item[key]);

/**
 * Objectの配列から、特定のkeyをキーワードにObjectを絞り込む
 * @param array Objectの配列
 * @param target 対象となるkey
 * @param keyword 絞り込む条件
 */
export const narrowdownArrayObject = <T>(
  array: T[],
  target: keyof T,
  keyword: T[keyof T]
): T[] => array.filter((object) => object[target] === keyword);

/**
 * カクヨムの独自タグ（|《》や《《》》）を対応するタグに変換する
 * @param str 変換したい文字列
 * @param [prefix="util"] class属性の最初につける文字（ex. ns → class="ns-ruby"）
 */
export const kakuyomuOriginalTagConvert = (
  str: string,
  prefix: string = "util"
): string => {
  const converted = str
    .replace(
      /[|｜](.+?)《(.+?)》/g,
      `<ruby class="${prefix}-ruby">$1<rt>$2</rt></ruby>`
    )
    .replace(
      /《《(.+?)》》/g,
      `<strong class="${prefix}-emphasis">$1</strong>`
    );
  return converted;
};

/**
 * 非同期にファイルの存在確認を行なう
 * @param file ファイルのパス
 */
export const isExistFile = async (
  file: string
): Promise<boolean | undefined> => {
  try {
    await Deno.stat(file);
    return true;
  } catch (err) {
    if (err) return false;
  }
};

/**
 * 同期的にファイルの存在確認を行なう
 * @param file ファイルのパス
 */
export const isExistFileSync = (file: string): boolean | undefined => {
  try {
    Deno.statSync(file);
    return true;
  } catch (err) {
    if (err) return false;
  }
};

/**
 * 非同期にファイル作成を行なう
 * @param rawdata ファイルに書き込むデータ
 * @param file 書き込むファイルのパス
 */
export const writeFile = async (
  rawdata: string,
  file: string
): Promise<void> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(rawdata);
  await Deno.writeFile(file, data);
};

/**
 * 同期的にファイル作成を行なう
 * @param rawdata ファイルに書き込むデータ
 * @param file 書き込むファイルのパス
 */
export const writeFileSync = (rawdata: string, file: string): void => {
  const encoder = new TextEncoder();
  const data = encoder.encode(rawdata);
  Deno.writeFileSync(file, data);
};

/**
 * 非同期にファイル読込を行なう
 * @param file 読み込むファイルのパス
 */
export const readFile = async (file: string): Promise<string> => {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(file);
  return decoder.decode(data);
};

/**
 * 同期的にファイル読込を行なう
 * @param file 読み込むファイルのパス
 */
export const readFileSync = (file: string): string => {
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(file);
  return decoder.decode(data);
};

/**
 * 任意の数字を文字に変換し、任意の桁数になるよう先頭に0を追加する
 * @param num 変換したい数字
 */
export const zeroPadding = (num: number): string =>
  String(num).padStart(2, "0");

interface ReadDateOptions {
  date?: string;
  zeropadding?: boolean;
}
type Days = "日" | "月" | "火" | "水" | "木" | "金" | "土";
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
    options?.zeropadding ? zeroPadding(datetime) : datetime;

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

interface TypedFetchOptions extends RequestInit {
  url: string;
  wanttype: "json" | "text" | "arrayBuffer";
}

/**
 * 型定義できるFetch APIラッパー試製版
 *
 * @param options.url 取得対象のURL
 * @param options.wanttype 取得したいデータ形式
 * @param options.method HTTPメソッド（今のところGETしか使えないと思う）
 * @param options.mode
 * @param options.headers
 * @param options.body
 * @param options.cache
 * @param options.credentials
 * @param options.keepalive
 * @param options.integrity
 * @param options.redirect
 * @param options.referrer
 * @param options.referrerPolicy
 * @param options.signal
 * @param options.window
 */
export const typedFetch = async <T>(
  options: TypedFetchOptions
): Promise<string | T | ArrayBuffer> => {
  const res = await fetch(options.url, {
    mode: options.mode,
    method: options.method,
    headers: options.headers,
    body: options.body,
    cache: options.cache,
    credentials: options.credentials,
    keepalive: options.keepalive,
    integrity: options.integrity,
    redirect: options.redirect,
    referrer: options.referrer,
    referrerPolicy: options.referrerPolicy,
    signal: options.signal,
    window: options.window,
  });

  let data: T | ArrayBuffer | string;
  if (options.wanttype === "json") data = await res.json();
  else if (options.wanttype === "arrayBuffer") {
    data = await res.arrayBuffer();
  } else data = await res.text();

  return data;
};
