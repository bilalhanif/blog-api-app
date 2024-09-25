import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './blog-post.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async createPost(title: string, content: string, author: User): Promise<BlogPost> {
    const newPost = this.blogPostRepository.create({ title, content, author });
    return this.blogPostRepository.save(newPost);
  }

  async getAllPosts(): Promise<BlogPost[]> {
    return this.blogPostRepository.find({ relations: ['author'] });
  }

  async getPostById(id: number): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async updatePost(id: number, title: string, content: string): Promise<BlogPost> {
    const post = await this.getPostById(id);
    post.title = title;
    post.content = content;
    return this.blogPostRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.getPostById(id);
    await this.blogPostRepository.remove(post);
  }
}
