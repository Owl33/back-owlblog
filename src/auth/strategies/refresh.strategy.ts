import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../users/user.service";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  // constructor(
  //   private readonly configService: ConfigService,
  //   private readonly userService: UserService
  // ) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (request) => {
  //         return request?.cookies?.refreshToken;
  //       },
  //     ]),
  //     secretOrKey: configService.get("JWT_REFRESH_SECRET"),
  //     passReqToCallback: true,
  //   });
  // }
  // async validate(req, payload: any) {
  //   const refreshToken = req.cookies?.refreshToken;
  //   const user = this.userService.matchesRefreshTokenToUser(
  //     refreshToken,
  //     payload.uesrId
  //   );
  //   return user;
  // }
}
