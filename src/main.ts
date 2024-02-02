import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "./common/http.exception.filter";
import { ResponseInterceptor } from "./common/http.response.interceptor";
// import { undefinedToNullInterceptor } from "./common/undefined.interceptor";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const options = new DocumentBuilder()
    .setTitle("Owl Blog API")
    .setDescription("Owl Blog API")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useGlobalInterceptors(new undefinedToNullInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors();



  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document); // 'api-docs'는 swagger문서로 접속할 url을 말한다.

  await app.listen(3000);
}
bootstrap();
