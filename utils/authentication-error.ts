import { ErrorResponse } from './error-response';

export class AuthenticationError extends ErrorResponse {
  statusCode = 401;

  constructor(public message: string = 'Not Authorized') {
    super(message);

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
