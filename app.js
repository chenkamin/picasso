const express = require('express');
const filesRouter = require('./routes/filesRouter')
const authRouter = require('./routes/authRouter')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const app = express();
const morgan = require('morgan')
const cors = require('cors');

//middleware
//logs
app.use(morgan('dev'));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use(express.json({ limit: '10kb' }));
app.use('/api', limiter);
app.use(cors())
app.use(helmet());
app.use(xss());

//routes
app.use('/health', (req, res) => {
    res.send("hello world")
})
app.use('/api/v1/', authRouter);
app.use('/api/v1/', filesRouter);

app.all('*', (req, res, next) => {
    next(res.status(404).json({ message: "route not exists" }));
});

module.exports = app;
