import { Controller, UseGuards, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //먼저 localGuards를 실행시켜서 auth.service의 validateUser 실행시켜서 이메일과 비밀번호 체크
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req) {
    console.log("req", req.user);
    //localGaurds에 담긴 값
    const user = req.user;
    //authService의 login으로 jwt sign 실행
    return this.authService.login(user);
  }
}
