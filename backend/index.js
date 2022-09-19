const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const storeRoutes = require('./src/routes/store')

const app = express()

mongoose
  .connect('mongodb://db:27017/stores', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())
app.use(storeRoutes)

app.listen(3000, () =>
  console.log('Backend running')
);