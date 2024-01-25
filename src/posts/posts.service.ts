import { Injectable } from "@nestjs/common";
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
    const test = await this.postsRepository.find();
    console.log(test);
    return test;
  }

  async writePost(data: { title: string; contents: string; category: string }) {
    const { title, contents, category } = data;
    console.log(data);
    const post = await this.postsRepository.save({
      title: title,
      contents: contents,
      category: category,
    });
    return post;
  }

  async modifyPost(data: {
    postId: any;
    title: string;
    contents: string;
    category: string;
  }) {
    const { postId, title, contents, category } = data;
    const update = await this.postsRepository.update(
      { post_id: postId },
      {
        title: title,
        contents: contents,
        category: category,
      }
    );
    console.log("dads");
    console.log(update?.affected);
    return { affected: update?.affected };
  }
}
