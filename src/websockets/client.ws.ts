import app from '../app';
import { ConnectionService } from '../services/connection.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

type Params = {
  text: string;
  email: string;
};

const io = app.io;

// Com o connet nós conseguimos reutilizar a conexão estabelecida em app.ts
io.on('connect', (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  // Aqui vamos fazer todos os eventos relacionados com o cliente
  // Os nomes dos eventos devem ser unicos
  socket.on('client_first_access', async (params: Params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    // Pode se que o usuário tenha sido salvo de uma outra maneira que não seja web socket

    const user = await userService.getOrCreate(email);

    if (user.id) {
      const connection = await connectionService.findByUserId(user.id);

      // Se já houver uma conexão com este usuário apenas irá alterar o socket id
      if (!connection) {
        await connectionService.create({ socket_id, user_id: user.id });
      } else {
        connection.socket_id = socket_id;
        await connectionService.create({
          socket_id,
          user_id: user.id,
          id: connection.id,
        });
      }

      await messageService.create({ text, user_id: user.id });

      // Buscando e emetindo todas as mensagens deste usuário
      const allMessages = await messageService.findByUser(user.id);
      socket.emit('client_list_all_messages', allMessages);

      const allUsers = await connectionService.findAllWithoutAdmin();
      io.emit('admin_list_all_users', allUsers);
    }
  });

  socket.on('client_send_to_admin', async (params) => {
    const { text, socket_admin_id } = params;

    const connection = await connectionService.findBySocketId(socket.id);

    if (connection?.user_id) {
      const message = await messageService.create({
        text,
        user_id: connection?.user_id,
      });

      io.to(socket_admin_id).emit('admin_receive_message', {
        message,
        socket_id: socket.id,
      });
    }
  });
});
