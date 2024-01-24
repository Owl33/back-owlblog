import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  async getPosts() {
    return 'User Main Page';
  }
}
