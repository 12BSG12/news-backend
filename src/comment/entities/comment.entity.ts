import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: 'recipe ' })
@Entity('comments')
export class CommentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @ManyToOne(() => UserEntity, {nullable: false})
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, {nullable: false})
  @JoinColumn({ name: 'postId' })
  post: PostEntity;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
