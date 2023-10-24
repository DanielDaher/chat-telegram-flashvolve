require('dotenv').config();
const messagesController = require("../controllers/messagesController");

module.exports = (bot, io) => {
  bot.on('message', async (msg) => {
    io.emit('telegramMessage', msg);
    try {
      const requisition = { 
        body: { source: 'telegram', chat: msg.chat, date: msg.date, text: msg.text }
      }
      await messagesController.create(requisition);
    } catch (error) {
      console.error(error);
    }
  });
}
