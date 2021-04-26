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
    const connection = await connectionRepository().findOne({ user_id });
    return connection;
  }

  async findAllWithoutAdmin(): Promise<ConnectionEntity[]> {
    return await connectionRepository().find({
      where: { admin_id: null },
      relations: ['user'],
    });
  }

  async findBySocketId(
    socket_id: string,
  ): Promise<ConnectionEntity | undefined> {
    const connection = await connectionRepository().findOne({ socket_id });
    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await connectionRepository()
      .createQueryBuilder()
      .update(ConnectionEntity)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}
