import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity("tb_posts")
export class PostsEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  post_id: string;

  @Column("varchar", { unique: false, nullable: false })
  title: string;

  @Column("longtext", { unique: false, nullable: true })
  contents: string;

  @Column("varchar", { unique: false, nullable: false })
  category: string;


}
