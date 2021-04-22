import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';

@Entity('connections')
export class ConnectionEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  socket_id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

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
