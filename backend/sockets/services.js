const validateJWTSocket = require("../auth/validateJWTsocket");
const messagesController = require("../controllers/messagesController");

const createMessage = async ({ message, token, socket, io, bot, chatId }) => {
  try {
    const userIsValid = await validateJWTSocket(token);
    if (userIsValid.errorMessage) return socket.emit('invalidToken', userIsValid.errorMessage);
  
    const { _id, userName } = userIsValid;
  
    const requisition = { user: { _id, userName }, body: { text: message, source: 'webchat', chat: { id: chatId, first_name: userName } } };
    const insertMessageOnDatabase = await messagesController.create(requisition);

    bot.sendMessage(chatId, message);
  
    if (insertMessageOnDatabase.responseMessage === 'message inserted on database') {
      const socketMessageResponse = { text: message, source: 'webchat', chat: { first_name: userName, id: chatId } };
      return io.emit('chatMessage', socketMessageResponse);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createMessage,
};