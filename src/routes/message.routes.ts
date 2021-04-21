import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';

const routes = Router();
const messageController = new MessageController();

routes.post('/', messageController.store);
routes.get('/:user_id', messageController.listByUser);

export default routes;
