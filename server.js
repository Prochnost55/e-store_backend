require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require("./route/user.route");
const config = require('./config')[process.env.NODE_ENV];

const port = config.PORT;

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      });

app.use('/api/user', userRoute);

app.get('/', (req, res) => {
        res.send('hello world')
})

mongoose.connect(config.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  console.log('connected to db')
  app.listen(port, () => {
        console.log(`server start @ ${port}`)
})
});
