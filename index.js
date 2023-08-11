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
        origin: ['http://localhost:3000', 
        'http://127.0.0.1:3000',
        'https://print-mate-client-side.vercel.app',
        'https://www.printmate.uk',
        "https://print-mate-client-side.vercel.app/",
        'https://www.printmate.uk/',            
    ],        
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
            AmountOfPrintedPages : req.body.AmountOfPrintedPages,
            CoverOption: req.body.CoverOptiont,
            FolderType : req.body.FolderType,
            Finishing: req.body.Finishing,
            MenuType: req.body.MenuType
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

app.delete('/deleteQuotation' , async (req,res)=>
{
    try {
        const deletedQuotation = await QuotationModel.findByIdAndDelete(req.body.id);
        if (deletedQuotation) {
            res.status(200).json({ success: true, message: 'Quotation deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Quotation not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the quotation' });
    }
})

app.get('/getContactedQuotations', async (req, res) => {
    try {
        console.log('Hi')
        const contactedQuotations = await QuotationModel.find({ Status: 'Contacted' });
        if (contactedQuotations) {
            res.status(200).json({ success: true, contactedQuotations });
        } else {
            res.status(404).json({ success: false, message: 'No contacted quotations found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while getting the contacted quotations' });
    }
});

app.get('/getUncontactedQuotations' , async (req,res)=>{
    try {
        const uncontactedQuotations = await QuotationModel.find({ Status: 'Not Contacted' });
        if (uncontactedQuotations) {
            res.status(200).json({ success: true, uncontactedQuotations });
        } else {
            res.status(404).json({ success: false, message: 'No uncontacted quotations found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while getting the uncontacted quotations' });
    }
})        

app.put('/MarkContacted' , async (req,res)=>
{
    try
    {
        let id= req.body.id;
        const UpdatedQuotation = await QuotationModel.findByIdAndUpdate({
            _id: id
        },
        {
            Status: 'Contacted'
        },
        {
            new: true

        })
        if (UpdatedQuotation) {
            res.status(200).json({ success: true, UpdatedQuotation });
        }
        else {
            res.status(404).json({ success: false, message: 'No quotation found' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while updating the quotation' });
    }
})

app.delete('/DeleteQuote' , async (req,res)=>{
    try{
        let id = req.body.id;
        const DeletedQuotation = await QuotationModel.findByIdAndDelete(id);
        if (DeletedQuotation) {
            res.status(200).json({ success: true, DeletedQuotation });
        }
        else {
            res.status(404).json({ success: false, message: 'No quotation found' });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the quotation' });
    }
})


app.listen( PORT , ()=> {console.log(`LISTENING AT PORT: ${PORT}`)} )
