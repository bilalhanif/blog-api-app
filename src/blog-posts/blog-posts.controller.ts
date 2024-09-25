import { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Request } from 'express';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'author')
  @Post()
  async createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.blogPostsService.createPost(title, content, user);
  }

  @Get()
  async getAllPosts() {
    return this.blogPostsService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: number) {
    return this.blogPostsService.getPostById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'author')
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.blogPostsService.updatePost(id, title, content);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'author')
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.blogPostsService.deletePost(id);
  }
}
