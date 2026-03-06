import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseBuilder } from '../../response/builder.response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor, procure seu administrador';
    let error: string = '';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'object') {
        const r = response as any;
        message = r.message ?? message;
        error = r.error ?? null;
      } else {
        message = response;
      }
    }
    const body = ResponseBuilder.status(status).mensagem(message).erro(error).path(req.path).metodo(req.method).build();
    return res.status(status).json(body);
  }
}
