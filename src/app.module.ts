import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";

import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/user.module";

import * as path from "path";
const setDatabase = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: "mysql",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    database: configService.get<string>("DB_DATABASE"),
    username: configService.get<string>("DB_USER"),
    password: configService.get<string>("DB_PASSWORD"),
    synchronize: false, // 무조건 false로 해두세요.
    logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
    timezone: "local",
    entities: [path.join(__dirname, "/*/entity/*.entity.{js, ts}")],
    retryAttempts: 5, // 연결에 실패했을 경우, 연결 재시도 횟수를 의미합니다.
  }),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    setDatabase,
    UserModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
