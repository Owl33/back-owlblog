import { Controller, UseGuards, Post, Req, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/auth.dto";
@ApiTags("Auth API")
@Controller("/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //먼저 localGuards를 실행시켜서 auth.service의 validateUser 실행시켜서 이메일과 비밀번호 체크
  @ApiOperation({
    summary: "로그인 API",
    description: "로컬 로그인",
  })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req, @Res({ passthrough: true }) res) {
    //localGaurds에 담긴 값
    const { user } = req.user;

    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);
    await this.authService.setRefreshToken(refreshToken, user.userId);
    res.cookie("refreshToken", refreshToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000, //3d,
      secure: true,
      httpOnly: false,
      sameSite: "none",
      path: "/",
      // domain: "localhost",
      domain: ".vercel.app",
    });

    return {
      accessToken,
      // refreshToken,
    };
  }

  @Post("refresh")
  async refresh(@Req() req, @Res({ passthrough: true }) res) {
    const { user } = req;

    console.log(req.cookies);
    // console.log(res);
    const accessToken = this.authService.refresh(req.cookies.refreshToken);

    return accessToken;
  }

  @Post("signout")
  async signout(@Req() req, @Res({ passthrough: true }) res) {
    // const { user } = req;
    // // const accessToken = this.authService.createAccessToken(user);
    // await this.authService.removeRefreshToken(user.userId);

    // res.cookie("accessToken", "");
    res.cookie("refreshToken", "");
    // // return user;
    return;
  }
}
