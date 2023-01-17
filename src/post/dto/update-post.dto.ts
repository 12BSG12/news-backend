import { ArgsType } from '@nestjs/graphql';
import { CreatePostDto } from './create-post.dto';
@ArgsType()
export class UpdatePostDto extends CreatePostDto {}
