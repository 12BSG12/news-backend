import { Field, ObjectType, Int } from '@nestjs/graphql';
import { PageMetaDtoParameters } from './type';

@ObjectType({ description: 'recipe ' })
export class PageMetaDto {
  @Field(() => Int)
  readonly page: number;
  
  @Field(() => Int)
  readonly take: number;
  
  @Field(() => Int)
  readonly itemCount: number;
  
  @Field(() => Int)
  readonly pageCount: number;
  
  @Field()
  readonly hasPreviousPage: boolean;
  
  @Field()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
