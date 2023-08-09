const mongoose = require('mongoose');
const {Schema } = mongoose;

const QuotationModel = new Schema(
    {
        Product:
        {
            type: String,            
        },
        Name: 
        {   type: String, required: true },
        Email:
        {   type: String, required: true,},
        Address: 
        {   type: String, required: true},
        Phone:
        {   type: String, required: true},
        Quantity:
        {
            type: Number,
        },
        Delivery:
        {
            type: String,
        },
        PaperType:
        {
            type: String,
        },
        PaperWeight:
        {
            type: String,
        },
        Sides:
        {
            type: String,
        },
        Lamination:
        {
            type: String,
        },
        UVSpot:
        {
            type: String,
        },
        Corner:
        {
            type: String,
        },
        Fold:
        {
            type: String,
        },
        Sizes:
        {
            type: String,
        },
        Envelope:
        {
            type: String,
        },
        DrillOption:
        {
            type: String,
        },
        RollerBannerType:
        {
            type: String,
        },
        FlagType:
        {
            type: String,
        },
        AmountOfPrintedPages:
        {
            type: String,
        },
        timestamp: 
        {
            type: Date,
            default: Date.now,
        },
    }
);
const Quote = mongoose.model('Quotations' , QuotationModel);
module.exports = Quote;