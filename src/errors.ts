import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface IAppErrorResponse {
  message: string;
}

class AppError extends Error {
  statuscode: number;
  response: IAppErrorResponse;
  constructor(message: string, statuscode: number = 400) {
    super(message);
    this.response = { message };
    this.statuscode = statuscode;
  }
}

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statuscode).json(err.response);
  }
  if (err instanceof ValidationError) {
    return res.status(401).json({ message: err.errors });
  }
  return res.status(500).json({ message: "internal server error" });
};
export { AppError, errorHandler };
