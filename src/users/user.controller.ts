import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/user.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("/v1/user")
@ApiTags("Users API")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: "회원가입 API",
  })
  @ApiBody({
    type: RegisterUserDto,
  })
  @Post("register")
  async register(@Body() body) {
    return this.userService.register(body);
  }
}
