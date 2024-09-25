import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { BlogPost } from 'src/blog-posts/blog-post.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(text: string, postId: number, user: User): Promise<Comment> {
    const comment = new Comment();
    comment.text = text;
    comment.blogPosts = { id: postId } as BlogPost;
    comment.author = user;
    return this.commentRepository.save(comment);
  }

  async getAllComments(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { blogPosts: { id: postId } } });
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async updateComment(id: number, text: string): Promise<Comment> {
    const comment = await this.getCommentById(id);
    comment.text = text;
    return this.commentRepository.save(comment);
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.getCommentById(id);
    await this.commentRepository.remove(comment);
  }
}
