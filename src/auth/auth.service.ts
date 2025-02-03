import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/entity/user.entity";
import { Repository } from "typeorm";
import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../users/user.service";
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async validateUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new BadRequestException("이메일이 잘못되었습니다");
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException("비밀번호가 일치하지 않습니다.");
    }

    return {
      user,
    };
  }

  async refresh(refreshToken) {
    //리프레쉬 토큰 검증
    const checkRefreshToken = await this.jwtService.verify(refreshToken, {
      secret: this.configService.get("JWT_REFRESH_SECRET"),
    });

    console.log(refreshToken);
    const userId = checkRefreshToken.userId;

    //db에서 유저 찾기
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
    });

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.refreshToken
    );
    if (isRefreshTokenMatching) {
      const accessToken = this.createAccessToken(user);
      return accessToken;
    } else {
      throw new BadRequestException("리프레쉬 해독에 실패했습니다.");
    }

  }

  async createAccessToken(user) {
    return this.jwtService.sign(
      { userId: user.userId },
      {
        secret: this.configService.get("JWT_ACCESS_SECRET"),
        expiresIn: this.configService.get("JWT_ACCESS_PERIOD"),
      }
    );
  }
  async createRefreshToken(user) {
    return this.jwtService.sign(
      { userId: user.userId },
      {
        secret: this.configService.get("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.get("JWT_REFRESH_PERIOD"),
      }
    );
  }
  async setRefreshToken(refreshToken: string, userId: number) {
    await this.userRepository.update(userId, {
      refreshToken: await hash(refreshToken, 10),
    });
  }
  async removeRefreshToken(user) {
    await this.userRepository.update(user.userId, {
      refreshToken: null,
    });
  }

  // async login(user) {
  //   return {
  //     userId: user.user.userId,
  //     accessToken: this.jwtService.sign(user, {
  //       secret: this.configService.get("JWT_ACCESS_SECRET"),
  //       expiresIn: "300s",
  //     }),
  //   };
  // }
}
