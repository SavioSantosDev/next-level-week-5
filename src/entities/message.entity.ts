import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Entity('messages')
export class MessageEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  text?: string;

  @CreateDateColumn()
  created_at?: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  user_id?: string;

  @Column()
  admin_id?: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
