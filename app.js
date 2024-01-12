const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('./middlewares/rateLimit');
const { PORT, MONGO_URL } = require('./config');
const routes = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(MONGO_URL);
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://movie.shtrihh.nomoredomainsmonster.ru',
    'https://movie.shtrihh.nomoredomainsmonster.ru',
    'https://api.movie.shtrihh.nomoredomainsmonster.ru',
    'http://api.movie.shtrihh.nomoredomainsmonster.ru',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
