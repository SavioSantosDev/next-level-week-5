import { ConnectionEntity } from '../entities/connection.entity';
import { connectionRepository } from '../repositories/connection.repository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

export class ConnectionService {
  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: IConnectionCreate): Promise<ConnectionEntity> {
    const connection = connectionRepository().create({
      socket_id,
      user_id,
      admin_id,
      id,
    });
    await connectionRepository().save(connection);
    return connection;
  }

  async findByUserId(user_id: string): Promise<ConnectionEntity | undefined> {
    const connection = connectionRepository().findOne({ user_id });
    return connection;
  }
}
