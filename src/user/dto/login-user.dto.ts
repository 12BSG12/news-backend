import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Некорректный адрес эл.почты' })
  email: string;

  @Length(6, 32, { message: 'Минимальная длина пароля 6 символов' })
  password?: string;
}
