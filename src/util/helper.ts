import { PageOptionsDto } from './../pagination/pageOptions.dto';
import { CommentEntity } from './../comment/entities/comment.entity';
import { UserEntity } from './../user/entities/user.entity';
import { NotFoundException } from "@nestjs/common";
import { PostEntity } from 'src/post/entities/post.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const findInfo = (find: PostEntity | UserEntity | CommentEntity, message: string) => {
  if(!find){
    throw new NotFoundException(message);
  }
  return find;
} 

export const isDev = () => {
  const arrScripts = JSON.parse(process.env.npm_config_argv).cooked as [];
  const dev = arrScripts.find(item => item === 'start:dev') as string;
  return dev?.endsWith('dev') ?? false;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export const skipPage = (pageOptionsDto: PageOptionsDto) => (pageOptionsDto.page - 1) * pageOptionsDto.take;
