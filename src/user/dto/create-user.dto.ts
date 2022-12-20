import { ArgsType, Field } from '@nestjs/graphql';
import { IsEmail, Length } from 'class-validator';

@ArgsType()
export class CreateUserDto {
  @Field()
  @Length(2, 32, { message: 'Минимальная длина имени 2 символа' })
  fullName: string;
  
  @Field()
  @IsEmail(undefined, { message: 'Некорректный адрес эл.почты' })
  email: string;

  @Field({ nullable: true })
  @Length(6, 32, { message: 'Минимальная длина пароля 6 символов' })
  password?: string;
}
