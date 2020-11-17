var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SeedSchema = new Schema(
  {
    name: {type: String, required: true},
    summary: {type: String},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    plant: {type: Schema.Types.ObjectId, ref: 'PlantType', required: true},
    price: {type: Number, min:[0, 'Price must be a positive number']},
    expiration_date: {type: Date}
  }
);

// Virtual for Seed's URL
SeedSchema
.virtual('url')
.get(function () {
  return '/catalog/seed/' + this._id;
});

//Export model
module.exports = mongoose.model('Seed', SeedSchema);