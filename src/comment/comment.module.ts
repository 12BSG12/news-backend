import { CommentEntity } from './entities/comment.entity';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
