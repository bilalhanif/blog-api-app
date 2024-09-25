import { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Body('text') text: string,
    @Req() req: Request,
  ) {
    const user = req.user;
    return this.commentsService.createComment(text, postId, user);
  }

  @Get(':postId')
  async getCommentsForPost(@Param('postId') postId: number) {
    return this.commentsService.getAllComments(postId);
  }

  @Get(':id')
  async getCommentById(@Param('id') id: number) {
    return this.commentsService.getCommentById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'author')
  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body('text') text: string,
  ) {
    return this.commentsService.updateComment(id, text);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'author')
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
