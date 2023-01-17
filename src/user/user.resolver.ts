import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from './../util/helper';
import { PageMetaDto } from '../pagination/pageMeta.dto';
import { PageOptionsDto } from '../pagination/pageOptions.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { SearchUsersDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUsers(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.userService.findAll(pageOptionsDto);
  }

  @Query(() => PageMetaDto)
  async getPageInfo(@Args() pageOptionsDto: PageOptionsDto) {
    return await this.userService.pageInfo(pageOptionsDto);
  }

  @Query(() => UserEntity)
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.findById(id);
  }

  @Query(() => [UserEntity])
  getSearchUsers(
    @Args() pageOptionsDto: PageOptionsDto,
    @Args() dto: SearchUsersDto,
  ) {
    return this.userService.search(pageOptionsDto, dto);
  }

  @Mutation(() => Int)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  async getMyProfile(@CurrentUser() user: UserEntity) {
    return await this.userService.findById(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserEntity)
  async updateUser(
    @CurrentUser() user: UserEntity,
    @Args() UpdateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(user.id, UpdateUserDto);
  }
}
