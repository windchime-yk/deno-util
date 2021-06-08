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
  temporaryRedirect: 307,
  permanentRedirect: 308,
} as const;

const clientErrorCode = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  conflict: 409,
  ImATeapot: 418,
} as const;

const serverErrorCode = {
  internalServerError: 500,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
} as const;

export const statusCode = {
  ...serverErrorCode,
  ...clientErrorCode,
  ...redirectionCode,
  ...successCode,
  ...informationalCode,
} as const;

export type StatusCode = typeof statusCode;
