const {Schema, model} = require('mongoose');
const product = new Schema({
   name: {type: String, required: true},
   price: {type: Number, required: true},
   inStock: {type: Number, required: true},
   timeUploaded: {type: Date, required: true}
}, {
   toObject: {
       virtuals: true
   }
});
module.exports = model('products', product);
