const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const history = require('connect-history-api-fallback');
require('dotenv').config();

const connect = require('./models');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo')
const postRouter = require('./routes/post')
const authRouter = require('./routes/auth')

const app = express();

connect(); //DB  실행

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use('/', indexRouter);
app.use(history());
app.use('/api/todos', todoRouter);
app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);


//catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
    //set locals only providing error in development
    res.locals.message = err.messge;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(app.get('port'), () => {
    console.log(`서버가 ${app.get("port")}에서 동작중입니다.`);
})