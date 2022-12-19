import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class LoginUserDto {
  @Field()
  @IsEmail(undefined, { message: 'Некорректный адрес эл.почты' })
  email: string;

  @Field({ nullable: true })
  @Length(6, 32, { message: 'Минимальная длина пароля 6 символов' })
  password?: string;
}
