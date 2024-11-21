const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
   redirectedUrl:{
    type: String,
    required: true,
   
   },
   name:{
    type: String,
    required: true,
    unique: true,
   },

   fullUrl:{
    type: String,
    required: true,
    
   }
  },
   {
    timestamps: true
   });

module.exports = mongoose.model('urls', urlSchema);