//use .env
require('dotenv').config()

//importing modules
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


//port and connnection string fron .env
const PORT = process.env.PORT;
const dbURI = process.env.MONGODB_URI;

//creating express app
const app = express();

//app middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true, }))

//using  routes
app.use('/api', require('./routes/productroute'))


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    });
  })
  .catch((err) => console.log(err));

