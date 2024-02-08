import { PickType } from "@nestjs/swagger";
import { PostsEntity } from "../entity/posts.entity";
import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { Transform } from "class-transformer";
export class GetPostDto extends PickType(PostsEntity, [
  "postId",
  "title",
  "contents",
  "category",
  "creation_at",
]) {
  @Transform(({ value }) => value.toISOString().split("T")[0], {
    toPlainOnly: true,
  })
  creation_at: Date;
}

export class WritePostDto extends PickType(PostsEntity, [
  "title",
  "contents",
  "category",
]) {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class ModifyPostDto extends WritePostDto {}
