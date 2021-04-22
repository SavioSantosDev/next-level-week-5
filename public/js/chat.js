/* eslint-disable no-undef */

document.querySelector('#start_chat').addEventListener('click', (event) => {
  const socket = io();
  // A partir deste momento já estamos diponíveise para emtir e ouvir eventos

  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

  // Quando estiver conectado
  socket.on('connect', () => {
    const params = { email, text };

    socket.emit('first_client_access', params, (call, err) => {
      err ? console.error(err) : console.log(call);
    });
  });
});
