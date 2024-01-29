import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CommonEntity } from "../../common/common.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("tb_posts")
export class PostsEntity extends CommonEntity {
  @ApiProperty({
    example: "1",
    description: "post id",
    required: true,
  })
  @PrimaryGeneratedColumn({ type: "int" })
  post_id: number;

  @ApiProperty({
    example: "포스트 제목",
    required: true,
  })
  @Column("varchar", { unique: false, nullable: false })
  title: string;

  @ApiProperty({
    example: "안녕하세요.",
    description: "포스트 내용",
    required: false,
  })
  @Column("longtext", { unique: false, nullable: true })
  contents: string;

  @ApiProperty({
    example: "개발",
    description: "분류할 카테고리",
    required: false,
  })
  @Column("varchar", { unique: false, nullable: false })
  category: string;
}
