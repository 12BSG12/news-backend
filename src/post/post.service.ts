import { PageOptionsDto } from './../pagination/pageOptions.dto';
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

  async findAll(pageOptionsDto: PageOptionsDto) {
    const qb = this.repository.createQueryBuilder('posts');

    if (pageOptionsDto.order) {
      qb.orderBy('id', pageOptionsDto.order);
    }
    qb.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const { entities } = await qb.getRawAndEntities();

    return entities;
  }

  async popular(pageOptionsDto: PageOptionsDto) {
    const qb = this.repository.createQueryBuilder('popPosts');

    if (pageOptionsDto.order) {
      qb.orderBy('views', pageOptionsDto.order);
    }

    qb.where(`popPosts.views >= 10`);


    qb.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const { entities } = await qb.getRawAndEntities();

    return entities;
  }

  async search(pageOptionsDto: PageOptionsDto, dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder('sPosts');

    if (pageOptionsDto.order) {
      qb.orderBy('views', pageOptionsDto.order);
    }
    qb.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    

    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
      views: pageOptionsDto.order || '',
    });


    if (dto.body) {
      qb.andWhere(`sPosts.body ILIKE :body`);
    }

    if (dto.title) {
      qb.andWhere(`sPosts.title ILIKE :title`);
    }

    if (dto.tag) {
      qb.andWhere(`sPosts.tag ILIKE :tag`);
    }
    
    const { entities } = await qb.getRawAndEntities();

    return entities;
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
