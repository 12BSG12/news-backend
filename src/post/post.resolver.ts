import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PostEntity } from 'src/post/entities/post.entity';
import { PageOptionsDto } from './../pagination/pageOptions.dto';
import { Resolver, Args, Query, ID, Mutation } from '@nestjs/graphql';
import { SearchPostDto } from './dto/search-post.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UseGuards } from '@nestjs/common';

@Resolver('post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  async createPost(@Args() dto: CreatePostDto) {
    return await this.postService.create(dto);
  }

  @Query(() => [PostEntity])
  async getAllPosts(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.postService.findAll(pageOptionsDto);
  }

  @Query(() => [PostEntity])
  async getPopularPost(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.postService.popular(pageOptionsDto);
  }

  @Query(() => PostEntity)
  getPostById(@Args('id', { type: () => ID }) id: number) {
    return this.postService.findOne(id);
  }

  @Query(() => [PostEntity])
  async getSearchPost(
    @Args() pageOptionsDto: PageOptionsDto,
    @Args() dto: SearchPostDto,
  ) {
    return await this.postService.search(pageOptionsDto, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PostEntity)
  async updatePost(
    @Args('id', { type: () => ID }) id: number,
    @Args() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(id, updatePostDto);
  }

  @Mutation(() => ID)
  async removePost(@Args('id', { type: () => ID }) id: number) {
    return await this.postService.remove(id);
  }
}
