const {Schema,model} = require('mongoose');

const countSchema = new Schema({index: Number});


module.exports = model('countUrl', countSchema);