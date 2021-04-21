import { EntityRepository, Repository, getCustomRepository } from 'typeorm';

import { UserEntity } from './../entities/user.entity';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {}

export function userRepository(): UserRepository {
  return getCustomRepository(UserRepository);
}
