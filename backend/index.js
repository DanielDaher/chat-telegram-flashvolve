const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const TelegramBot = require('node-telegram-bot-api');
require('./Integrations/telegramBot')(TelegramBot);

app.get('/', (req, res) => res.send('Hello World!'));
http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));