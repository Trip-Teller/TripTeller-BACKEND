const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const consultantRouter = require('./routes/consultatnt');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');

const { handler: errorHandler } = require('./middlewares/error');

const app = express();

// view engine setup
app.set('views', './views');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/consultant/v0', consultantRouter.v0.router);
app.use('/auth/v0', authRouter.v0.router);
app.use('/user/v0', userRouter.v0.router);
app.use('/chat/v0', chatRouter.v0.router);

app.use(errorHandler);

module.exports = app;
