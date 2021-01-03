const express = require('express');
const {errors} = require('celebrate');

const initDb = require('./db');
const userRouter = require('./api');
const logger =  require('./middlewares/logger');
initDb();

const app = express();
const port = process.env.PORT

//middlewares
app.use(logger);
app.use(express.json());
app.use(userRouter);
app.use(errors())

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
