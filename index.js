const UserModel = require('./Models/UserModel')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const GetToken = require('./Middleware/GetToken')
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const routes = require("./Routes/Config");


const app = express();
const PORT = process.env.PORT || 3001
const DATABASE_STRING = process.env.DATABASE_CONNECTION

app.use(express.json())
app.use(cors(
    {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],        
    }
));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes(app);  

mongoose.set('strictQuery', true);
const Database_Connection = async () => {
  try {
    await mongoose.connect(DATABASE_STRING);
    console.log("CONNECTED TO DATABASE SUCCESSFULLY 🚀🚀");
  } catch (error) {
    console.error("FAILED TO CONNECT TO DATABASE:", error.message);
  }
};
Database_Connection()



app.listen( PORT , ()=> {console.log(`LISTENING AT PORT: ${PORT}`)} )
