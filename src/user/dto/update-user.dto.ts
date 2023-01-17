import { ArgsType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.dto';

@ArgsType()
export class UpdateUserDto extends CreateUserDto {}
