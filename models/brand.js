var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BrandSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
  }
);


// Virtual for plant type's URL
BrandSchema
.virtual('url')
.get(function () {
  return '/catalog/brand/' + this._id;
});

//Export model
module.exports = mongoose.model('Brand', BrandSchema);