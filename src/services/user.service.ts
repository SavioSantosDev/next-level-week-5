import { UserEntity } from './../entities/user.entity';
import { userRepository } from '../repositories/user.repository';

export class UserService {
  async create(email: string): Promise<UserEntity> {
    const userExists = await userRepository().findOne({ email });

    if (userExists) {
      return userExists;
    }

    const createdUser = userRepository().create({ email });

    await userRepository().save(createdUser);
    return createdUser;
  }
}
