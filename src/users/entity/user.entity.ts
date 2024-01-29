import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "@/common/common.entity";
import { ApiProperty } from "@nestjs/swagger";
@Entity("tb_users")
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

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
}
