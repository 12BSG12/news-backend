import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class UsersArgs {
  @Field({ nullable: true })
  orderBy?: 'DESC' | 'ASC';

  @Field(() => Int, { nullable: true })
  limit?: number;
  
  @Field(() => Int, { nullable: true })
  take?: number;
}
