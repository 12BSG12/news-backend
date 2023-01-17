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
  create(dto: CreateCommentDto, userId: number) {
    return this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: userId },
    });
  }

  async findAll(postId: number) {
    const qb = this.repository.createQueryBuilder('c');

    if (postId) {
      qb.where('c.postId = :postId', { postId });
    }

    const arr = await qb
      .leftJoinAndSelect('c.post', 'post')
      .leftJoinAndSelect('c.user', 'user')
      .getMany();

    return arr.map((obj) => {
      return {
        ...obj,
        post: { id: obj.post.id, title: obj.post.title },
      };
    });

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
    await this.repository.delete(id);
    return id;
  }
}
