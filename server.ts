const informationalCode = {
  continue: 100,
  switchingProtocols: 101,
  processing: 102,
  earlyHints: 103,
} as const;

const successCode = {
  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  IMUsed: 226,
} as const;

const redirectionCode = {
  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  _unused: 306,
  temporaryRedirect: 307,
  permanentRedirect: 308,
} as const;

const clientErrorCode = {
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  rangeNotSatisfiable: 416,
  expectationFailed: 417,
  ImATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  tooEarly: 425,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,
} as const;

const serverErrorCode = {
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511,
} as const;

/**
 * すべてのHTTPステータスコード
 */
export const statusCode = {
  ...serverErrorCode,
  ...clientErrorCode,
  ...redirectionCode,
  ...successCode,
  ...informationalCode,
} as const;

/**
 * すべてのHTTPステータスコードの型定義
 */
export type StatusCode = typeof statusCode;

/**
 * HTTPステータスコードの値だけ抜き出した型定義
 */
export type StatusCodeNumber = StatusCode[keyof StatusCode];

/** SVG固有の要素名定義マップ */
type HTMLSvgElementTagNameMap =
  | "svg"
  | "accent-height"
  | "accumulate"
  | "additive"
  | "alignment-baseline"
  | "alphabetic"
  | "amplitude"
  | "arabic-form"
  | "ascent"
  | "attributeName"
  | "attributeType"
  | "azimuth"
  | "baseFrequency"
  | "baseline-shift"
  | "baseProfile"
  | "bbox"
  | "begin"
  | "bias"
  | "by"
  | "calcMode"
  | "cap-height"
  | "class"
  | "clip"
  | "clipPathUnits"
  | "clip-path"
  | "clip-rule"
  | "color"
  | "color-interpolation"
  | "color-interpolation-filters"
  | "color-profile"
  | "color-rendering"
  | "contentScriptType"
  | "contentStyleType"
  | "crossorigin"
  | "cursor"
  | "cx"
  | "cy"
  | "d"
  | "decelerate"
  | "descent"
  | "diffuseConstant"
  | "direction"
  | "display"
  | "divisor"
  | "dominant-baseline"
  | "dur"
  | "dx"
  | "dy"
  | "edgeMode"
  | "elevation"
  | "enable-background"
  | "end"
  | "exponent"
  | "fill"
  | "fill-opacity"
  | "fill-rule"
  | "filter"
  | "filterRes"
  | "filterUnits"
  | "flood-color"
  | "flood-opacity"
  | "font-family"
  | "font-size"
  | "font-size-adjust"
  | "font-stretch"
  | "font-style"
  | "font-variant"
  | "font-weight"
  | "format"
  | "from"
  | "fr"
  | "fx"
  | "fy"
  | "g1"
  | "g2"
  | "glyph-name"
  | "glyph-orientation-horizontal"
  | "glyph-orientation-vertical"
  | "glyphRef"
  | "gradientTransform"
  | "gradientUnits"
  | "hanging"
  | "height"
  | "href"
  | "hreflang"
  | "horiz-adv-x"
  | "horiz-origin-x"
  | "id"
  | "ideographic"
  | "image-rendering"
  | "in"
  | "in2"
  | "intercept"
  | "k"
  | "k1"
  | "k2"
  | "k3"
  | "k4"
  | "kernelMatrix"
  | "kernelUnitLength"
  | "kerning"
  | "keyPoints"
  | "keySplines"
  | "keyTimes"
  | "lang"
  | "lengthAdjust"
  | "letter-spacing"
  | "lighting-color"
  | "limitingConeAngle"
  | "local"
  | "marker-end"
  | "marker-mid"
  | "marker-start"
  | "markerHeight"
  | "markerUnits"
  | "markerWidth"
  | "mask"
  | "maskContentUnits"
  | "maskUnits"
  | "mathematical"
  | "max"
  | "media"
  | "method"
  | "min"
  | "mode"
  | "name"
  | "numOctaves"
  | "offset"
  | "opacity"
  | "operator"
  | "order"
  | "orient"
  | "orientation"
  | "origin"
  | "overflow"
  | "overline-position"
  | "overline-thickness"
  | "panose-1"
  | "paint-order"
  | "path"
  | "pathLength"
  | "patternContentUnits"
  | "patternTransform"
  | "patternUnits"
  | "ping"
  | "pointer-events"
  | "points"
  | "pointsAtX"
  | "pointsAtY"
  | "pointsAtZ"
  | "preserveAlpha"
  | "preserveAspectRatio"
  | "primitiveUnits"
  | "r"
  | "radius"
  | "referrerPolicy"
  | "refX"
  | "refY"
  | "rel"
  | "rendering-intent"
  | "repeatCount"
  | "repeatDur"
  | "requiredExtensions"
  | "requiredFeatures"
  | "restart"
  | "result"
  | "rotate"
  | "rx"
  | "ry"
  | "scale"
  | "seed"
  | "shape-rendering"
  | "slope"
  | "spacing"
  | "specularConstant"
  | "specularExponent"
  | "speed"
  | "spreadMethod"
  | "startOffset"
  | "stdDeviation"
  | "stemh"
  | "stemv"
  | "stitchTiles"
  | "stop-color"
  | "stop-opacity"
  | "strikethrough-position"
  | "strikethrough-thickness"
  | "string"
  | "stroke"
  | "stroke-dasharray"
  | "stroke-dashoffset"
  | "stroke-linecap"
  | "stroke-linejoin"
  | "stroke-miterlimit"
  | "stroke-opacity"
  | "stroke-width"
  | "style"
  | "surfaceScale"
  | "systemLanguage"
  | "tabindex"
  | "tableValues"
  | "target"
  | "targetX"
  | "targetY"
  | "text-anchor"
  | "text-decoration"
  | "text-rendering"
  | "textLength"
  | "to"
  | "transform"
  | "transform-origin"
  | "type"
  | "u1"
  | "u2"
  | "underline-position"
  | "underline-thickness"
  | "unicode"
  | "unicode-bidi"
  | "unicode-range"
  | "units-per-em"
  | "v-alphabetic"
  | "v-hanging"
  | "v-ideographic"
  | "v-mathematical"
  | "values"
  | "vector-effect"
  | "version"
  | "vert-adv-y"
  | "vert-origin-x"
  | "vert-origin-y"
  | "viewBox"
  | "viewTarget"
  | "visibility"
  | "width"
  | "widths"
  | "word-spacing"
  | "writing-mode"
  | "x"
  | "x-height"
  | "x1"
  | "x2"
  | "xChannelSelector"
  | "xlink:actuate"
  | "xlink:arcrole"
  | "xlink:href"
  | "xlink:role"
  | "xlink:show"
  | "xlink:title"
  | "xlink:type"
  | "xml:base"
  | "xml:lang"
  | "xml:space"
  | "y"
  | "y1"
  | "y2"
  | "yChannelSelector"
  | "z"
  | "zoomAndPan";

/** HTML要素名の定義マップ */
type HTMLElementTagNameMap =
  | "a"
  | "abbr"
  | "address"
  | "applet"
  | "area"
  | "article"
  | "aside"
  | "audio"
  | "b"
  | "base"
  | "basefont"
  | "bdi"
  | "bdo"
  | "blockquote"
  | "body"
  | "br"
  | "button"
  | "canvas"
  | "caption"
  | "cite"
  | "code"
  | "col"
  | "colgroup"
  | "data"
  | "datalist"
  | "dd"
  | "del"
  | "details"
  | "dfn"
  | "dialog"
  | "dir"
  | "div"
  | "dl"
  | "dt"
  | "em"
  | "embed"
  | "fieldset"
  | "figcaption"
  | "figure"
  | "font"
  | "footer"
  | "form"
  | "frame"
  | "frameset"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "head"
  | "header"
  | "hgroup"
  | "hr"
  | "html"
  | "i"
  | "iframe"
  | "img"
  | "input"
  | "ins"
  | "kbd"
  | "label"
  | "legend"
  | "li"
  | "link"
  | "main"
  | "map"
  | "mark"
  | "marquee"
  | "menu"
  | "meta"
  | "meter"
  | "nav"
  | "noscript"
  | "object"
  | "ol"
  | "optgroup"
  | "option"
  | "output"
  | "p"
  | "param"
  | "picture"
  | "pre"
  | "progress"
  | "q"
  | "rp"
  | "rt"
  | "ruby"
  | "s"
  | "samp"
  | "script"
  | "section"
  | "select"
  | "slot"
  | "small"
  | "source"
  | "span"
  | "strong"
  | "style"
  | "sub"
  | "summary"
  | "sup"
  | "svg"
  | "table"
  | "tbody"
  | "td"
  | "template"
  | "textarea"
  | "tfoot"
  | "th"
  | "thead"
  | "time"
  | "title"
  | "tr"
  | "track"
  | "u"
  | "ul"
  | "var"
  | "video"
  | "wbr" & HTMLSvgElementTagNameMap;

type Attribute = Record<string, string | number | boolean>;

type Text = string;

/**
 * HTMLタグの型定義
 */
export type Tag = (
  tagName: HTMLElementTagNameMap,
  attributesOrFirstChild:
    | Tag
    | Attribute
    | Text,
  ...children: Tag[] | Text[]
) => string;
