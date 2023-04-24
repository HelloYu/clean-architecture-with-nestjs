import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from 'src/domain/logger/logger.interface';

@Injectable()
export class nLoggerService implements ILogger {
  logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`[DEBUG] ${message}`, context);
    }
  }
  log(context: string, message: string) {
    this.logger.log(`[INFO] ${message}`, context);
  }
  error(context: string, message: string, trace?: string) {
    this.logger.error(`[ERROR] ${message}`, trace, context);
  }
  warn(context: string, message: string) {
    this.logger.warn(`[WARN] ${message}`, context);
  }
  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.verbose(`[VERBOSE] ${message}`, context);
    }
  }
}
