import { Column, Entity } from "typeorm";
import { CommonEntity } from "./common.entity";

@Entity("tb_posts")
export class PostsEntity extends CommonEntity {
  @Column("varchar", { unique: false, nullable: false })
  title: string;

  @Column("longtext", { unique: false, nullable: true })
  contents: string;

  @Column("varchar", { unique: false, nullable: false })
  category: string;

  @Column("int", { unique: false, nullable: false })
  is_delete: number;
}
