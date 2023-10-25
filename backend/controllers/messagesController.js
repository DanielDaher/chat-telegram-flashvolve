const messagesService = require('../services/messagesService');

const create = async (req, res) => {
  try {
    const { source, text, date, chat } = req.body;
    if (source === 'telegram') {
      const { statusCode, responseMessage } = await messagesService.create({ source, text, date, chat });
  
      return { statusCode, responseMessage };
    }

    const { _id: userID, userName: first_name } = req.user;
    const { statusCode, responseMessage } = await messagesService.create({ userID, first_name, text, chat, source });
  
    return { statusCode, responseMessage };
  } catch (error) {
    console.error(error);
    return  { statusCode: 400, responseMessage: error };
  }
};

const getLastThirtyMessages = async (req, res) => {
  const chatId = req.query.chatId;
  try {
    const messages = await messagesService.getLastThirtyMessages(chatId);
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

const getContacts = async (req, res) => {
  try {
    const telegramContacts = await messagesService.getContacts();
    return res.status(200).json({ telegramContacts });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

module.exports = {
  create,
  getLastThirtyMessages,
  getContacts
};