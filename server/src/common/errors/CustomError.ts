export class CustomError {
  errorCode: string;
  frontMessage: string;

  constructor(errorCode: string, frontMessage: string) {
    this.errorCode = errorCode;
    this.frontMessage = frontMessage;
  }
}
