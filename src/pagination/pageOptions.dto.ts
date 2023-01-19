import { ArgsType, Int } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from './type';

@ArgsType()
export class PageOptionsDto {
  @Field({ nullable: true })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @Field(() => Int, { nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Field(() => Int, { nullable: true })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;
}
