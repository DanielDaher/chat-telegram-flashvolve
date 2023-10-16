const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const TelegramBot = require('node-telegram-bot-api');
require('./Integrations/telegramBot')(TelegramBot);

const usersRoute = require('./Routes/usersRoute');
const loginRoute = require('./Routes/loginRoute');

app.use(express.json({
  type: ['application/json']
})); //https://stackoverflow.com/questions/54016068/empty-body-in-fetch-post-request

app.use('/users', usersRoute);

app.use('/login', loginRoute);

app.get('/', (req, res) => res.send('Hello World!'));
http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));