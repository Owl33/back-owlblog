import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity("tb_users")
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  user_id: number;

  @Column("varchar", { unique: true, nullable: false })
  email: string;

  @Column("varchar", { unique: false, nullable: false })
  password: string;

}
