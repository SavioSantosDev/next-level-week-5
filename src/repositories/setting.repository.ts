import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import { SettingEntity } from '../entities/setting.entity';

@EntityRepository(SettingEntity)
class SettingRepository extends Repository<SettingEntity> {}

export function settingRepository(): SettingRepository {
  return getCustomRepository(SettingRepository);
}
