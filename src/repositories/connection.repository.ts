import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import { ConnectionEntity } from '../entities/connection.entity';

@EntityRepository(ConnectionEntity)
class ConnectionRepository extends Repository<ConnectionEntity> {}

export function connectionRepository(): ConnectionRepository {
  return getCustomRepository(ConnectionRepository);
}
