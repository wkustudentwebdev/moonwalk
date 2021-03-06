// dotenv file
require('dotenv').config();

// modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

// global vars
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(logger(process.env.MORGAN_ENV));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    msg: 'Hello, world!',
    time: Date.now(),
  });
});

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
