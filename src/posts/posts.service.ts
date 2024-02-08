import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostsEntity } from "./entity/posts.entity";
import { Repository } from "typeorm";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>
  ) {}

  async getPosts() {
    const posts = await this.postsRepository.find();
    console.log(posts);
    return posts;
  }

  async getPost(postId: number) {
    const post = await this.postsRepository.findOne({
      where: { postId },
    });
    if (!post) {
      throw new BadRequestException("포스트를 찾지 못했습니다.");
    }
    return post;
  }

  async writePost(data: { title: string; contents: string; category: string }) {
    const { title, contents, category } = data;
    const post = await this.postsRepository.save({
      title: title,
      contents: contents,
      category: category,
    });
    return post;
  }

  async modifyPost(data: {
    postId: number;
    title: string;
    contents: string;
    category: string;
  }) {
    const { postId, title, contents, category } = data;
    console.log(data);
    const targetPost = await this.postsRepository.findOne({
      where: { postId },
    });
    if (!targetPost) {
      throw new BadRequestException("포스트를 찾지 못했습니다.");
    }

    const res = await this.postsRepository.update(
      { postId },
      {
        title: title,
        contents: contents,
        category: category,
      }
    );

    return { affected: res?.affected };
  }

  async deletePost(data: { postId: number }) {
    const { postId } = data;
    const targetPost = await this.postsRepository.findOne({
      where: { postId },
    });
    if (!targetPost) {
      throw new BadRequestException("포스트를 찾지 못했습니다.");
    }

    const res = await this.postsRepository.softDelete({ postId });
    return {
      affected: res?.affected,
    };
  }
}
