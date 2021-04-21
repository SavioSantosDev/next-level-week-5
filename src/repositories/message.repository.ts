import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

@EntityRepository(MessageEntity)
class MessageRepository extends Repository<MessageEntity> {}

export function messageRepository(): MessageRepository {
  return getCustomRepository(MessageRepository);
}
