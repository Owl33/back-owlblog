import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../common/common.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity("tb_users")
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @ApiProperty({
    example: "wianw@naver.com",
    required: true,
  })
  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: "Qq0306987@",
    required: true,
  })
  @Column("varchar", { unique: false, nullable: false })
  password: string;

  @ApiProperty({
    example: "asdasdas@",
  })
  @Column("varchar", { name: "refresh_token", unique: false, nullable: false })
  refreshToken: string;
}
