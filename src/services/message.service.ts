import { messageRepository } from '../repositories/message.repository';
import { MessageEntity } from './../entities/message.entity';

interface IMessageCreate {
  text: string;
  user_id: string;
  admin_id?: string;
}

export class MessageService {
  async create({
    text,
    user_id,
    admin_id,
  }: IMessageCreate): Promise<MessageEntity> {
    const message = messageRepository().create({
      text,
      user_id,
      admin_id,
    });

    await messageRepository().save(message);
    return message;
  }

  async findByUser(user_id: string): Promise<MessageEntity[]> {
    const messages = await messageRepository().find({
      where: { user_id },
      relations: ['user'],
    });
    return messages;
  }
}
