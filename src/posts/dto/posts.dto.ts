import { PickType } from "@nestjs/swagger";
import { PostsEntity } from "../entity/posts.entity";

export class getPostDto extends PickType(PostsEntity, [
  "post_id",
  "title",
  "contents",
  "category",
  "creation_at",
]) {}

export class WritePostDto extends PickType(PostsEntity, [
  "title",
  "contents",
  "category",
]) {}
