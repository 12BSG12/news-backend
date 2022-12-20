import { CurrentUser } from './../util/helper';
import { PageMetaDto } from '../pagination/pageMeta.dto';
import { PageMetaDtoParameters } from '../pagination/type';
import { UserModule } from './user.module';
import { PageOptionsDto } from '../pagination/pageOptions.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { SearchUsersDto } from './dto/search-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @UseGuards(JwtAuthGuard)
//   @Get('me')
//   getProfile(@Request() req) {
//     return req.user;
//   }

//   @UseGuards(JwtAuthGuard)
//   @Patch('me')
//   update(
//     @Request() req: { user: { id: string } },
//     @Body() updateUserDto: UpdateUserDto,
//   ) {
//     return this.userService.update(+req.user.id, updateUserDto);
//   }
// }

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
  async getProfile(@CurrentUser() user: UserEntity) {
    return user.id;
  }
}
