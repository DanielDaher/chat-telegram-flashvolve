const messagesModel = require('../models/messagesModel');

const create = async (requisition) => {
  try {
    const insert = await messagesModel.create(requisition);

    return { responseMessage: insert, statusCode: 201 };
  } catch (error) {
    console.error(error);
    return { responseMessage: error, statusCode: 400 };
  }
};

const getLastThirtyMessages = async () => {
  try {
    const messages = await messagesModel.getLastThirtyMessages();
    return messages;
  } catch (error) {
    console.error(error);
    return { error };
  }
};

const getContacts = async () => {
  try {
    const telegramChats = await messagesModel.getContacts();
    return telegramChats;
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