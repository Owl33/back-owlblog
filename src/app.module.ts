import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsModule } from "./posts/posts.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";

import * as path from "path";
const setDatabase = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: "mysql", // 어떤 DB를 사용할 것인지
    host: configService.get<string>("DB_HOST"), // 우리는 본인 컴퓨터에 설치된 DB를 사용할 것이디 localhost로 설정
    port: configService.get<number>("DB_PORT"), // MySQL의 기본 포트는 3306 입니다.
    database: configService.get<string>("DB_DATABASE"), // 위에서 만든 study 데이터베이스로 설정
    username: configService.get<string>("DB_USER"), // 설정한 username입력, 기본은 root
    password: configService.get<string>("DB_PASSWORD"), // 설정한 password입력
    synchronize: false, // 무조건 false로 해두세요.
    logging: true, // typeorm 쿼리 실행시, MySQL의 쿼리문을 터미널에 보여줍니다.
    timezone: "local",
    entities: [path.join(__dirname, "/entities/**/*.entity.{js, ts}")],
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
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
