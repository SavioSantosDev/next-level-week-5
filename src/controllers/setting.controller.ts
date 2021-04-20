import { Request, Response } from 'express';
import { settingRepository } from '../repositories/setting.repository';

export class SettingController {
  async store(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    const { username, chat } = req.body;

    const setting = settingRepository().create({
      username,
      chat,
    });
    await settingRepository().save(setting);

    return res.status(201).json(setting);
  }
}
