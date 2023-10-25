require('dotenv').config();
const messagesController = require("../controllers/messagesController");

module.exports = (bot, io) => {
  bot.on('message', async (msg) => {
    const messageData = { source: 'telegram', chat: msg.chat, date: msg.date, text: msg.text }
    io.emit('telegramMessage', messageData);
    try {
      const requisition = { 
        body: messageData
      }
      await messagesController.create(requisition);
    } catch (error) {
      console.error(error);
    }
  });
}
