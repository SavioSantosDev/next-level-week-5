import app from '../app';
import { ConnectionService } from '../services/connection.service';
import { MessageService } from '../services/message.service';

const io = app.io;

io.on('connect', async (socket) => {
  const connectionService = new ConnectionService();
  const messageService = new MessageService();

  const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();

  // Com socket o evento é emitido diretamente para o usuário conectado
  // Com o io vái ser emitido para todos que estiverem ouvindo o evento
  io.emit('admin_list_all_users', allConnectionsWithoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, cb) => {
    const { user_id } = params;

    const allMessages = await messageService.findByUser(user_id);

    cb(allMessages);
  });

  socket.on('admin_send_message', async (params) => {
    const { user_id, text } = params;

    await messageService.create({
      text,
      user_id,
      admin_id: socket.id,
    });

    const connection = await connectionService.findByUserId(user_id);
    if (connection?.socket_id) {
      io.to(connection?.socket_id).emit('admin_send_to_client', {
        text,
        socket_id: socket.id,
      });
    }
  });

  socket.on('admin_user_in_support', async (params) => {
    const { user_id } = params;
    await connectionService.updateAdminID(user_id, socket.id);

    const allConnectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allConnectionsWithoutAdmin);
  });
});
