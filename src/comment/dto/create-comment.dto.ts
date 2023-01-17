import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class CreateCommentDto {
  @Field()
  @IsNotEmpty({message: 'Текст не может быть пустым'})
  text: string;

  @Field(() => ID)
  @IsNotEmpty()
  postId: number;
}
