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


const QuotationModel = require("./Models/QuotationModel")

app.post('/addQuotation', async (req, res) => {
    try {
        console.log(req.body);
        const newQuotation = new QuotationModel({
            Name: req.body.Name,
            Email: req.body.Email,
            Phone: req.body.Phone,
            Address: req.body.Address,
            Delivery: req.body.Delivery,
            Quantity: req.body.Quantity,
            Product: req.body.Product,
            PaperType: req.body.PaperType,
            PaperWeight: req.body.PaperWeight,
            Sides: req.body.Sides,
            Lamination: req.body.Lamination,
            UVSpot: req.body.UVSpot,
            Corner: req.body.Corner,
            Fold: req.body.Fold,
            Sizes: req.body.Sizes,
            Envelope: req.body.Envelope,
            DrillOption : req.body.DrillOption,
            RollerBannerType: req.body.RollerBannerType,
            FlagType :  req.body.FlagType,
            AmountOfPrintedPages : req.body.AmountOfPrintedPages
        });

        const savedQuotation = await newQuotation.save();

        if (savedQuotation) {
            res.status(201).json({ success: true, message: 'Quotation added successfully' });
        } else {
            res.status(500).json({ success: false, message: 'Failed to add quotation' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while adding the quotation' });
    }
});


app.listen( PORT , ()=> {console.log(`LISTENING AT PORT: ${PORT}`)} )
