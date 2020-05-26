/**
 * Objectの配列から、特定のkeyの値を配列として抽出する
 * @param arr Objectの配列
 * @param key 配列として取得したいkey
 */
export const extractObjectValue = <T>(arr: T[], key: keyof T) => arr.map(item => item[key])

/**
 * カクヨムの独自タグ（|《》や《《》》）を対応するタグに変換する
 * @param str 変換したい文字列
 * @param [prefix="util"] class属性の最初につける文字（ex. ns → class="ns-ruby"）
 */
export const kakuyomuOriginalTagConvert = (str: string, prefix: string = 'util') => {
  const converted = str.replace(/[|｜](.+?)《(.+?)》/g, `<ruby class="${prefix}-ruby">$1<rt>$2</rt></ruby>`).replace(/《《(.+?)》》/g, `<strong class="${prefix}-emphasis">$1</strong>`)
  return converted
}