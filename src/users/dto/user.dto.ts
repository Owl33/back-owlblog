import { PickType } from "@nestjs/swagger";
import { UserEntity } from "../entity/user.entity";

export class RegisterUserDto extends PickType(UserEntity, ["email", "password"]) {}
