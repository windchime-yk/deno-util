/**
 * 非同期にファイルの存在確認を行なう
 * @param file ファイルのパス
 */
export const isExistFile = async (
  file: string,
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
  file: string,
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
  options: TypedFetchOptions,
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
