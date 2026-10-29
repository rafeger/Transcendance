import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { ConsoleLogger } from '@nestjs/common';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            prefix: 'MyQuiz',
            json: true,
            logLevels: ['log', 'warn', 'error', 'fatal'],
        }),
    });
    app.setGlobalPrefix('api');
    const config = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(config.getOrThrow('PORT'));
}
await bootstrap();
//# sourceMappingURL=main.js.map