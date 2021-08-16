interface CustomError {
  errorCode: string;
  frontMessage: string;
}

interface ConstructorParams {
  status: number,
  couldReachServer?: boolean,
  customErrors?: CustomError[],
  defaultMsg?: string,
  tokenHasExpired?: boolean
}

export class CustomHttpError extends Error {
  status: number;

  couldReachServer: boolean;

  customErrors: CustomError[];

  name: string;

  defaultMsg: string;

  frontMsg: string;

  tokenHasExpired: boolean;

  constructor({
    status, couldReachServer = true, customErrors = [], defaultMsg = 'An error occurred.', tokenHasExpired = false,
  }: ConstructorParams) {
    super();
    this.status = status;
    this.couldReachServer = couldReachServer;
    this.customErrors = customErrors;
    this.defaultMsg = defaultMsg;
    this.frontMsg = customErrors.reduce((acc, current) => acc.concat('\n').concat(current.frontMessage), '');
    this.tokenHasExpired = tokenHasExpired;
    this.name = 'CustomHttpError';
  }
}
