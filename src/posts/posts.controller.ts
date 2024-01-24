import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { PostsService } from "./posts.service";
@Controller("/posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get("/list")
  async getPosts() {
    return this.postService.getPosts();
  }

  @Post("/write")
  async writePosts(@Body() body) {
    return this.postService.writePost(body);
  }

  @Put("/modify/:postId")
  async updateArticle(@Param("postId") postId, @Body() body) {
    const res = await this.postService.modifyPost({ postId, ...body });

    return res;
  }
}
