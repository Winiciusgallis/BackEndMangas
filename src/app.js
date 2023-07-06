const express = require('express');
const routeManga = require('./routes/routeManga');
const imagens = require('./routes/imagens')
const capitulos = require('./routes/capitulos')
const errorMiddleware = require('./middlewares/errorMiddleware')
const cors = require('cors')
require('express-async-errors');
const app = express();
app.use(cors())

app.use(express.json());
app.use('/mangas', routeManga);
app.use('/capitulos',capitulos)
app.use('/imagens',imagens)


app.use(errorMiddleware)

module.exports = {
  app,
}