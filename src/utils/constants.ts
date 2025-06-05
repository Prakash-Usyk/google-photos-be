export enum ResponseStatus {
  BAD_REQUEST = 400,
  VALIDATION_ERROR = 412,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
  INTERNAL_ERROR = 500,
  BAD_GATEWAY = 502,
  SUCCESS = 200,
  CREATED = 201,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum DateFormate {
  DATE_TIME_FULL_FORMAT = 'YYYY-MM-DD HH:mm:ss',
  DATE_TIME_START_FORMAT = 'YYYY-MM-DD 00:00:00',
  DATE_TIME_END_FORMAT = 'YYYY-MM-DD 23:59:59',
  DATE_TIME_A_FORMAT = 'YYYY-MM-DD hh:mm A',
  DATE_TIME_AS_FORMAT = 'YYYY-MM-DD hh:mm:ss A',
  DATE_TIME_HM_FORMAT = 'YYYY-MM-DD HH:mm',
  DATE_FORMAT = 'YYYY-MM-DD',
  DATE_FORMAT_JOIN = 'YYYYMMDD',
  TIME_FULL_24_FORMAT = 'HH:mm:ss',
  TIME_FULL_12_FORMAT = 'hh:mm:ss',
  TIME_HM_FORMAT = 'HH:mm',
  TIME_A_FORMAT = 'hh:mm A',
  TIME_AS_FORMAT = 'hh:mm:ss A',
}
export enum DefaultResponseType {
  SUCCESS_MSG = 'success',
  ERROR_MSG = 'error',
}

export enum DefaultMessage {
  USER_NO_ACCESS = 'Company ID / User ID Missing',
  COMPANY_USER_MISSING = 'Company ID / User ID Missing',
  COMPANY_NOT_EXISTS = 'Company Not exists',
  INV_PAGE_COUNT = 'Invalid Page Number / Count',
  PAGE_COUNT_MISSING = 'Page / Count Missing',
  INV_DATE = 'Invalid Date',
  INV_USER_UID = 'Invalid User ID',
  INV_USER = 'Invalid User',
  DB_ERROR = 'Database Error',
  INVALID_ACCESS = 'Invalid Access',
  INVALID_TOKEN = 'Invalid Token',
  INVALID_LINK = 'Invalid Link',
  ALREADY_EXISTS = 'Already exists.',
  NAME_ALREADY_EXISTS = 'Name already exists',
  PRICE_EDIT_ACCESS_DENIED = "Material price is can't editable",
  AMOUNT_NOT_RECEIVED = "can't receive total amount when material is not received",
  INSUFFICIENT_USER = 'Insufficient User balance',
  NOT_EXISTS = 'Not exists.',
}

export const StaticVariables = { SUCCESS_CODES: [200, 201] };
