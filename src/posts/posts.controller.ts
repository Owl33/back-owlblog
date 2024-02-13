import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Res,
  UseGuards,
  Delete,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetPostDto, WritePostDto, ModifyPostDto } from "./dto/posts.dto";
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@Controller("/v1/posts")
@ApiTags("Posts API")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get("/")
  @UseInterceptors(ClassSerializerInterceptor)
  async getPosts() {
    const posts = await this.postService.getPosts();

    return posts.map((post) => Object.assign(new GetPostDto(), post));
  }

  @Get("/:postId")
  @UseInterceptors(ClassSerializerInterceptor)
  async getPost(@Param("postId") postId: number) {
    const post = await this.postService.getPost(postId);
    return Object.assign(new GetPostDto(), post);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: "게시글 작성 API",
    description: "게시글 작성한다.",
  })
  @ApiBody({
    type: WritePostDto,
  })
  @UseGuards(JwtAuthGuard)
  @Post("/save")
  async writePosts(@Body() body: WritePostDto) {
    const res = await this.postService.writePost(body);
    return res;
  }

  @Put("/save/:postId")
  async ModifyPost(
    @Param("postId") postId: number,
    @Body() body: ModifyPostDto
  ) {
    const res = await this.postService.modifyPost({ postId, ...body });

    return res;
  }

  @Delete("/:postId")
  async DeletePost(@Param("postId") postId: number) {
    const res = await this.postService.deletePost({ postId });
    return res;
  }
}
