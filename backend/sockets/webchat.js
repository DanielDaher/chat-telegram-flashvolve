const { createMessage } = require("./services");

module.exports = (io, bot) => io.on('connection', (socket) => {
  const { id } = socket;

  const botTelegram = bot;

  socket.on('chatMessage', async ({ message, token, chatId }) => await createMessage({ message, token, bot: botTelegram, socket, io, chatId }));

});