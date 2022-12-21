import { ArgsType, Field } from '@nestjs/graphql';
@ArgsType()
export class SearchPostDto {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
  
  @Field({ nullable: true })
  tag?: string;
}
