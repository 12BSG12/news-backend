import { UserEntity } from './../entities/user.entity';
import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(2, 32, { message: 'Минимальная длина имени 2 символа' })
  fullName: string;
 
  @IsEmail(undefined, { message: 'Некорректный адрес эл.почты' })
  email: string;

  @Length(6, 32, { message: 'Минимальная длина пароля 6 символов' })
  password?: string;
}
