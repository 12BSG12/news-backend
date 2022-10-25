import { CommentEntity } from './entities/comment.entity';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { findInfo } from 'src/util/helper';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}
  create(dto: CreateCommentDto) {
    return this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: 2}
    });
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return findInfo(
      await this.repository.findOne({ where: { id } }),
      'Комментарий не найден',
    );
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Комментарий не найден',
    );
    return this.repository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Комментарий не найден',
    );
    return this.repository.delete(id);
  }
}
