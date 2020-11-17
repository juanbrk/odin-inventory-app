var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, maxlength: 250},
    stock:{type: Number, min:0},
    category: {type: Schema.Types.ObjectId, ref: 'Category', maxlength: 100},
    brand: {type: Schema.Types.ObjectId, ref:'Brand', required:true},
    price: {type: Number, min:[0, 'Price must be a positive number']},
    status: {type: String, required: true, enum: ['Available', 'Sold out', 'Coming soon', 'Unavailable'], default: 'Available'},
  }
);


// Virtual for item's URL
ItemSchema
.virtual('url')
.get(function () {
  return '/catalog/item/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);