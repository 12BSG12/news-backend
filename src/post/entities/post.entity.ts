import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: 'recipe ' })
@Entity('posts')
export class PostEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  body: string;

  @Field(() => Int, {defaultValue: 0})
  @Column({ default: 0 })
  views: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tags?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
