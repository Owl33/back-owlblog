import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { hash } from "bcrypt"; // 이부분이 추가되었습니다.

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async register(data: { email: string; password: string }) {
    const { email, password } = data;

    const existedUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (existedUser) {
      throw new BadRequestException("이미 해당 이메일이 존재합니다.");
    } else {
      const hashedPassword = await hash(password, 10); // 10은 salt값으로 암호화할 때, 필요하다.

      const user = await this.userRepository.save({
        email,
        password: hashedPassword,
      });

      return user;
    }
  }
}
