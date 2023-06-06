require("dotenv").config();
const express = require("express");
const app = express();
const client  = require('./db/client.js');
client.connect();
// Setup your Middleware and API Router here
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const path = require("path");
app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/dist/index.html')));

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use('*', (req, res, next) => {
    res.status(404);
    res.send({ error: 'route not found' })
})

module.exports = app;
