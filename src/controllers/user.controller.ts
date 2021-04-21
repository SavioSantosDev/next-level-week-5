import { Request, Response } from 'express';

import { UserService } from '../services/user.service';

export class UserController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const userService = new UserService();

    try {
      const user = await userService.create(email);

      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error!' });
    }
  }
}
