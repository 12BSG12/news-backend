import { PostEntity } from 'src/post/entities/post.entity';
import { PageOptionsDto } from './../pagination/pageOptions.dto';
import { Resolver, Args, Query } from '@nestjs/graphql';
import { SearchPostDto } from './dto/search-post.dto';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// @Resolver('posts')
// export class PostResolver {
//   constructor(private readonly postService: PostService) {}

//   @Post()
//   create(@Body() dto: CreatePostDto) {
//     return this.postService.create(dto);
//   }




//   @Get('/search')
//   getSearchPost(@Query() dto: SearchPostDto) {
//     return this.postService.search(dto);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }

@Resolver('post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostEntity])
  async getAllPosts(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.postService.findAll(pageOptionsDto);
  }

  @Query(() => [PostEntity])
  async getPopularPost(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.postService.popular(pageOptionsDto);
  }

  @Query(() => [PostEntity])
  getSearchPost(@Args() pageOptionsDto: PageOptionsDto, @Args()  dto: SearchPostDto) {
    return this.postService.search(pageOptionsDto, dto);
  }
}
