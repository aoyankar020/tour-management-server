import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface TMeta {
  total?: number; // Total number of items (for paginated responses)
}
interface TResponseUtil<T> {
  statusCode: number; // HTTP status code
  success: boolean; // Indicates if the request was successful
  message: string; // Response message
  data: T; // Optional data to be sent in the response
  error?: string; // Optional error message
  meta?: TMeta; // Total number of items (for paginated responses)
}
export const sendResponse = <T>(res: Response, data: TResponseUtil<T>) => {
  const {
    statusCode,
    success,
    message,
    data: responseData,
    error,
    meta,
  } = data;

  res.status(statusCode).json({
    statusCode: data.statusCode,
    success: success,
    message: message,
    data: responseData,
    error: error,
    meta: meta,
  });
};
