require('dotenv').config();

module.exports = (TelegramBot, io) => {
  const token = `${process.env.BOT_TELEGRAM_TOKEN}`;
  const bot = new TelegramBot(token, {polling: true});
  
  bot.onText(/\/echo (.+)/, (msg, match) => {  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
  });

  bot.on('message', (msg) => {
    console.log(msg)
    const chatId = msg.chat.id;
    io.emit('telegramMessage', msg)
    
    bot.sendMessage(chatId, 'Received your message!!');
  });
}
