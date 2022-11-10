import { LoginUserDto } from './dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findInfo } from 'src/util/helper';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: number) {
    return findInfo(
      await this.repository.findOne({ where: { id } }),
      'Пользователь не найден',
    );
  }

  async findByCond(cond: LoginUserDto) {
    return this.repository.findOne({ where: { ...cond } })
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
