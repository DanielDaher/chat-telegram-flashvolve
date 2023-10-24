const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const io = require('socket.io')(http, {
  cors: {
    origin: [process.env.FRONTEND_URL, `${process.env.FRONTEND_URL}/dashboard`],
    methods: ['GET', 'POST'],
  },
});

const token = `${process.env.BOT_TELEGRAM_TOKEN}`;
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(token, {polling: true});
require('./Integrations/telegramBot')(bot, io);

require('./sockets/webchat')(io, bot);

const usersRoute = require('./Routes/usersRoute');
const loginRoute = require('./Routes/loginRoute');
const messagesRoute = require('./Routes/messagesRoute');

app.use(cors());
app.use(express.json({
  type: ['application/json']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use('/users', usersRoute);

app.use('/login', loginRoute);

app.use('/messages', messagesRoute);

app.get('/', (req, res) => res.send('Hello World!'));
http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));