import { Response } from 'express';

export const generateError = (
  res: Response,
  status: number,
  message: string
) => {
 return res.status(status).send({
    message
 });
};
