import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilterFilter } from './common/filters/http-exception.filter/http-exception.filter.filter';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	);
	await app.listen(3000);
	app.useGlobalFilters(new HttpExceptionFilterFilter());
}

bootstrap().catch(() => 'Error');
