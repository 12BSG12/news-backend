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

  async findAll(dto: SearchUsersDto) {
    const qb = this.repository.createQueryBuilder();

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    qb.orderBy('id', "DESC")
    
    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
  }

  async search(dto: SearchUsersDto) {
    const qb = this.repository.createQueryBuilder('p');

    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);

    qb.setParameters({
      fullName: `%${dto.fullName}%`,
      email: `%${dto.email}%`,
      id: dto.id || '',
    });

    if (dto.id) {
      qb.orderBy('id', dto.id);
    }

    if (dto.fullName) {
      qb.andWhere(`p.fullName ILIKE :fullName`);
    }

    if (dto.email) {
      qb.andWhere(`p.email ILIKE :email`);
    }
    
    const [items, totalCount] = await qb.getManyAndCount();

    return {
      items,
      totalCount,
    };
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
    return this.repository.delete(id);
  }
}
