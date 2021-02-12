const path = require('path');
const express = require('express');

const app = express();
require('dotenv').config();

app.use(express.static(path.join(__dirname, '../../build')));

app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../build', 'index.html')));

app.listen(process.env.PORT || 8080);
