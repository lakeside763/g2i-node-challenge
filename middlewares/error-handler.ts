import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from '../utils/error-response';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  return true;
};
