const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));
