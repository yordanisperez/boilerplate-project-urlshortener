const {Schema,model} = require('mongoose');



const urlSchema = new Schema({
    original_url: String,
    short_url: Number
  });


  module.exports = model('url', urlSchema);