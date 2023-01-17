import { ArgsType } from '@nestjs/graphql';
import { CreateCommentDto } from './create-comment.dto';

@ArgsType()
export class UpdateCommentDto extends CreateCommentDto {}
