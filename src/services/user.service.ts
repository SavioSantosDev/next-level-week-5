import { UserEntity } from './../entities/user.entity';
import { userRepository } from '../repositories/user.repository';

export class UserService {
  async getOrCreate(email: string): Promise<UserEntity> {
    const userExists = await this.findByEmail(email);

    if (userExists) {
      return userExists;
    }

    const createdUser = userRepository().create({ email });

    await userRepository().save(createdUser);
    return createdUser;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await userRepository().findOne({ email });
  }
}
