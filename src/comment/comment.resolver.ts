import { UserEntity } from 'src/user/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import {
  UseGuards,
} from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/util/helper';

@Resolver('comments')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  async createComment(
    @Args() dto: CreateCommentDto,
    @CurrentUser() user: UserEntity,
  ) {
    return await this.commentService.create(dto, user.id);
  }

  @Query(() => [CommentEntity])
  getAllComments( @Args('postId', { type: () => ID, nullable: true }) postId?: number,) {
    return this.commentService.findAll(postId);
  }

  @Query(() => CommentEntity)
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => CommentEntity)
  async updatePost(
    @Args('id', { type: () => ID }) id: number,
    @Args() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto);
  }

  @Mutation(() => ID)
  async removeComment(@Args('id', { type: () => ID }) id: number) {
    return await this.commentService.remove(id);
  }
}
