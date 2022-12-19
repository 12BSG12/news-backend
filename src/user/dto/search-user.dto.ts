import { Order } from './../../pagination/type';
import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class SearchUsersDto {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  email?: string;
}
