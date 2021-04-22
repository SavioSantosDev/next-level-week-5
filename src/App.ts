import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import { renderFile } from 'ejs';

import './database';
import publicRoutes from './routes/public.routes';
import settingRoutes from './routes/setting.routes';
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';

class App {
  private readonly baseServerURL = '/api';
  private readonly publicPath = path.resolve(__dirname, '..', 'public');
  private app;

  http;
  io: Server;

  constructor() {
    this.app = express();
    this.http = createServer(this.app);
    this.io = new Server(this.http);

    this.middlewares();
    this.routes();
    this.wsConnection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.static(this.publicPath));
    this.app.set('views', this.publicPath);
    this.app.engine('html', renderFile);
    this.app.set('view engine', 'html');
  }

  routes() {
    this.app.use('/', publicRoutes);
    this.app.use(`${this.baseServerURL}/settings`, settingRoutes);
    this.app.use(`${this.baseServerURL}/users`, userRoutes);
    this.app.use(`${this.baseServerURL}/messages`, messageRoutes);
  }

  wsConnection() {
    // connection é quando o usuário vai ter o primeiro acesso ao web socket
    this.io.on('connection', (socket: Socket) => {
      console.log('Se conectou ', socket.id);
    });
  }
}

export default new App();
