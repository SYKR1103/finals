import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Catch } from '@nestjs/common';

@Catch(HttpException)
export class HttpeExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; StatusCode: number; message: string | string[] };

    if (typeof error === 'string') {
      response.status(status).json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        message: error,
        data: null,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timeStamp: new Date().toISOString(),
        message: error.message,
        data: null,
      });
    }
  }
}
