import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field()
  body: string;
  
  @Field(() => Int, { nullable: true })
  views?: number;
  
  @Field({ nullable: true })
  tags?: string;
}
