import { ArgsType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

@ArgsType()
export class UpdateUserDto extends CreateUserDto {}
