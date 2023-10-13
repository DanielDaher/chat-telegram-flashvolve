const express = require('express');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));
http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));