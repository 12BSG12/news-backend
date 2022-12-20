import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
