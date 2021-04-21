import { Request, Response } from 'express';
import { MessageService } from '../services/message.service';

export class MessageController {
  async store(req: Request, res: Response): Promise<Response> {
    const { text, admin_id, user_id } = req.body;
    const messageService = new MessageService();

    try {
      const message = await messageService.create({ text, admin_id, user_id });
      return res.status(201).json(message);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }

  async listByUser(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.params;
    const messageService = new MessageService();

    try {
      const messages = await messageService.findByUser(user_id);
      return res.status(200).json(messages);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}
