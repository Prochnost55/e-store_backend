const express = require('express')
const app = express()
// const bodyParser = require('body-parser')
const userRoute = require("./route/user.route")

const port = 3030

app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        next();
      });

app.use('/api/user', userRoute);

app.get('/', (req, res) => {
        res.send('hello world')
})

app.listen(port, () => {
        console.log(`server start @ ${port}`)
})
