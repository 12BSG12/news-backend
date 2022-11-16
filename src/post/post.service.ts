import { findInfo } from './../util/helper';
import { PostEntity } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  create(dto: CreatePostDto) {
    return this.repository.save(dto);
  }

  async findAll() {
    const qb = this.repository.createQueryBuilder();

    qb.limit(10);

    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }

  async popular() {
    const qb = this.repository.createQueryBuilder();

    qb.orderBy('views', 'DESC');
    qb.limit(10);

    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: dto.views || '',
    });

    if (dto.views) {
      qb.orderBy('views', dto.views);
    }

    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }

    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }

    if (dto.tag) {
      qb.andWhere(`p.tag ILIKE :tag`);
    }

    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }

  async findOne(id: number) {
    await this.repository
      .createQueryBuilder('posts')
      .whereInIds(id)
      .update()
      .set({ views: () => 'views + 1' })
      .execute();

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
