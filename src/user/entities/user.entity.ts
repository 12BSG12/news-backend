import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ description: 'recipe ' })
@Entity('users')
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column({
    unique: true,
  })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  password?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
