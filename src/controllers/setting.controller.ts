import { ClientError } from './../errors/client.error';
import { Request, Response } from 'express';

import { SettingService } from '../services/setting.service';

export class SettingController {
  async store(req: Request, res: Response): Promise<Response> {
    const { username, chat } = req.body;
    const settingService = new SettingService();

    try {
      const setting = await settingService.create({ chat, username });

      return res.status(201).json(setting);
    } catch (err) {
      if (err instanceof ClientError) {
        return res.status(err.code).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}
