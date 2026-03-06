import { HttpException } from '@nestjs/common';

export interface ExceptionPayLoad {
  statusCode: number;
  message: string;
  error?: string | null;
}

export class NegocioException extends HttpException {
  constructor(payLoad: ExceptionPayLoad) {
    super(payLoad, payLoad.statusCode);
  }
}
