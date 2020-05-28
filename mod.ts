/**
 * Objectの配列から、特定のkeyの値を配列として抽出する
 * @param arr Objectの配列
 * @param key 配列として取得したいkey
 */
export const extractObjectValue = <T>(arr: T[], key: keyof T) => arr.map(item => item[key])

/**
 * Objectの配列から、特定のkeyをキーワードにObjectを絞り込む
 * @param array Objectの配列
 * @param target 対象となるkey
 * @param keyword 絞り込む条件
 */
export const narrowdownArrayObject = <T>(array: T[], target: keyof T, keyword: T[keyof T]) => 
  array.filter(object => object[target] === keyword)

/**
 * カクヨムの独自タグ（|《》や《《》》）を対応するタグに変換する
 * @param str 変換したい文字列
 * @param [prefix="util"] class属性の最初につける文字（ex. ns → class="ns-ruby"）
 */
export const kakuyomuOriginalTagConvert = (str: string, prefix: string = 'util') => {
  const converted = str.replace(/[|｜](.+?)《(.+?)》/g, `<ruby class="${prefix}-ruby">$1<rt>$2</rt></ruby>`).replace(/《《(.+?)》》/g, `<strong class="${prefix}-emphasis">$1</strong>`)
  return converted
}

/**
 * 非同期にファイルの存在確認を行なう
 * @param file ファイルのパス
 */
export const isExistFile = async (file: string) => {
  try {
    await Deno.stat(file)
    return true
  } catch (err) {
    if (err) return false
  }
}

/**
 * 同期的にファイルの存在確認を行なう
 * @param file ファイルのパス
 */
export const isExistFileSync = (file: string) => {
  try {
    Deno.statSync(file)
    return true
  } catch (err) {
    if (err) return false
  }
}