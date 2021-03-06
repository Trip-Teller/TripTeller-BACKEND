const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const consultantRouter = require('./routes/consultatnt');
const consultingDataRouter = require('./routes/consulting');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const { handler: errorHandler } = require('./middlewares/error');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/consultant/v0', consultantRouter.v0.router);
app.use('/consultingData/v0', consultingDataRouter.v0.router);
app.use('/auth/v0', authRouter.v0.router);
app.use('/user/v0', userRouter.v0.router);

app.use(errorHandler);

module.exports = app;
