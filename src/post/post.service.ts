import { findInfo } from './../util/helper';
import { PostEntity } from './entities/post.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    return findInfo(
      await this.repository.findOne({ where: { id } }),
      'Статья не найдена',
    );
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Статья не найдена',
    );
    return this.repository.update(id, updatePostDto);
  }

  async remove(id: number) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Статья не найдена',
    );
    return this.repository.delete(id);
  }
}
