import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RegAndLoginResponse {
  @Field(() => Int)
  id: number;
  
  @Field()
  email: string;

  @Field()
  token: string;
}
