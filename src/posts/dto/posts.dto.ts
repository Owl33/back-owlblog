import { PickType } from "@nestjs/swagger";
import { PostsEntity } from "../entity/posts.entity";
import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class getPostDto extends PickType(PostsEntity, [
  "postId",
  "title",
  "contents",
  "category",
  "creation_at",
]) {}

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
