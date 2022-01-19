const mongoose = require('mongoose');

let PullSchema = new mongoose.Schema({
    id : String,
    title : String,
    body : String,
    created_at : Date,
    url:String
});

module.exports = mongoose.model('pullDB',PullSchema );