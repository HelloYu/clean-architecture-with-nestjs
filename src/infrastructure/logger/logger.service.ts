import { Injectable } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';
import { Logger, createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService implements ILogger {
  logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new transports.File({
          filename: 'logs/info.log',
          level: 'info',
        }),
      ],
    });
  }
  debug(context: string, message: string) {
    this.logger.debug(message);
  }
  log(context: string, message: string) {
    this.logger.info(message);
  }
  error(context: string, message: string, trace?: string) {
    this.logger.error(message);
  }
  warn(context: string, message: string) {
    this.logger.warn(message);
  }

  verbose(context: string, message: string) {
    this.logger.verbose(message);
  }
}
