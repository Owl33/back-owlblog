import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { WritePostDto } from "./dto/posts.dto";
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("/posts")
@ApiTags("Posts API")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get("/list")
  async getPosts() {
    return this.postService.getPosts();
  }

  @ApiOperation({
    summary: "게시글 작성 API",
    description: "게시글 작성한다.",
  })
  @ApiBody({
    type: WritePostDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/write")
  async writePosts(@Body() body: WritePostDto) {
    return this.postService.writePost(body);
  }

  @Put("/modify/:postId")
  async updateArticle(@Param("postId") postId, @Body() body) {
    const res = await this.postService.modifyPost({ postId, ...body });

    return res;
  }
}
