import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/entity/user.entity";
import { Repository } from "typeorm";
import { compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReopository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.userReopository.findOne({
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

  async login(user) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
