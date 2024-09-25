import { Module } from '@nestjs/common';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';

@Module({
  providers: [BlogPostsService],
  controllers: [BlogPostsController]
})
export class BlogPostsModule {}
