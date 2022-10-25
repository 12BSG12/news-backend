import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty({message: 'Текст не может быть пустым'})
  text: string;

  @IsNotEmpty()
  postId: number;
}
