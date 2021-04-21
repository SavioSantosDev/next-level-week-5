import express from 'express';

import './database';
import settingRoutes from './routes/setting.routes';
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';

class App {
  app;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/settings', settingRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/messages', messageRoutes);
  }
}

export default new App().app;
