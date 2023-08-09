const mongoose = require('mongoose');
const {Schema } = mongoose;

const VidMe_User = new Schema(
    {
        FirstName: 
        {   type: String, required: true },
        LastName:
        {   type: String, required: true },
        Email:
        {   type: String, required: true,},
        Password: 
        {   type: String, required: true},
        timestamp: 
        {
            type: Date,
            default: Date.now,
        },
    }
);
const Users = mongoose.model('Users' , VidMe_User);
module.exports = Users;