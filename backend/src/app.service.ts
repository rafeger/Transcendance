// a basic service with a single method

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name, { timestamp : true });

  getHello(): string {
    return 'Hello World!';
  }
  getPing(): string {
    return 'pong';
  }
}
