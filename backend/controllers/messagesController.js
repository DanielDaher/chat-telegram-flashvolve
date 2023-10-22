const messagesService = require('../services/messagesService');

const create = async (req, res) => {
  try {
    console.log('req', req)
    const { source, text, date, chat } = req.body;
    console.log()
    if (source === 'telegram') {
      const { statusCode, responseMessage } = await messagesService.create({ source, text, date, chat });
  
      return { statusCode, responseMessage };
    }

    const { _id: userID, userName } = req.user;
    const { statusCode, responseMessage } = await messagesService.create({ userID, userName, text });
  
    return { statusCode, responseMessage };
  } catch (error) {
    console.error(error);
    return  { statusCode: 400, responseMessage: error };
  }
};

const getLastThirtyMessages = async (req, res) => {
  try {
    const messages = await messagesService.getLastThirtyMessages();
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

module.exports = {
  create,
  getLastThirtyMessages,
};