import { DateScalar } from './../common/scalars/date.scalar';
import { PageMetaDto } from '../pagination/pageMeta.dto';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, DateScalar],
  exports: [UserService],
})
export class UserModule {}
