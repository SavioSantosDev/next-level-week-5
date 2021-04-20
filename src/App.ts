import express from 'express';

import './database';
import settingRoutes from './routes/setting.routes';

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
    this.app.use(settingRoutes);
  }
}

export default new App().app;
