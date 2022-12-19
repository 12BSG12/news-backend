import { PageMetaDto } from '../pagination/pageMeta.dto';
import { PageOptionsDto } from '../pagination/pageOptions.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findInfo } from 'src/util/helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { SearchUsersDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const qb = this.repository.createQueryBuilder('users');

    if (pageOptionsDto.order) {
      qb.orderBy('id', pageOptionsDto.order);
    }
    qb.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    const { entities } = await qb.getRawAndEntities();

    return entities;
  }

  async pageInfo(pageOptionsDto: PageOptionsDto) {
    const qb = this.repository.createQueryBuilder('pageInfo');
    const itemCount = await qb.getCount();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return pageMetaDto;
  }

  async search(pageOptionsDto: PageOptionsDto, dto: SearchUsersDto) {
    const qb = this.repository.createQueryBuilder('searchUsers');

    if (pageOptionsDto.order) {
      qb.orderBy('id', pageOptionsDto.order);
    }
    qb.skip(pageOptionsDto.skip).take(pageOptionsDto.take);

    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
      id: pageOptionsDto.order || '',
    });

    if (dto.fullName) {
      qb.andWhere(`searchUsers.fullName ILIKE :fullName`);
    }

    if (dto.email) {
      qb.andWhere(`searchUsers.email ILIKE :email`);
    }

    const { entities } = await qb.getRawAndEntities();

    return entities;
  }

  async findById(id: number) {
    return findInfo(
      await this.repository.findOne({ where: { id } }),
      'Пользователь не найден',
    );
  }

  async findByCond(cond: LoginUserDto) {
    return this.repository.findOne({ where: { ...cond } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Пользователь не найден',
    );
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: number) {
    findInfo(
      await this.repository.findOne({ where: { id } }),
      'Пользователь не найден',
    );
    this.repository.delete({ id });
    return id;
  }
}
