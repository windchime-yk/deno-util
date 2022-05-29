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
 * @param keyword 絞り込む条件 */
export const narrowdownArrayObject = <T>(
  array: T[],
  target: keyof T,
  keyword: T[keyof T],
): T[] => array.filter((object) => object[target] === keyword);

export const typedJsonParse = <T = Record<never, never>>(text: string): T =>
  JSON.parse(text);
