import { settingRepository } from '../repositories/setting.repository';
import { SettingEntity } from '../entities/setting.entity';
import { ClientError } from '../errors/client.error';

interface ISettingCreate {
  chat: boolean;
  username: string;
}

export class SettingService {
  async create({ chat, username }: ISettingCreate): Promise<SettingEntity> {
    const userAlreadyExists = settingRepository().findOne({ username });
    if (userAlreadyExists) {
      throw new ClientError('User already exists');
    }

    const setting = settingRepository().create({
      username,
      chat,
    });
    await settingRepository().save(setting);

    return setting;
  }
}
