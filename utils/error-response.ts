export abstract class ErrorResponse extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this.message, ErrorResponse.prototype);
  }

  abstract serializeErrors(): {
    message: string,
    field?: string
  }[];
}
