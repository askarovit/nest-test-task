import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';

export interface IRejectResponse {
  code: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const errorResponse: IRejectResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: exception.message || null
    }

    Logger.error(`${errorResponse.method}${errorResponse.path}: ${errorResponse.message}`);
    response.status(status).json(errorResponse);
  }
}