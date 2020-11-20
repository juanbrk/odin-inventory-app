var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SeedSchema = new Schema(
  {
    description: {type: String},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    plant: {type: Schema.Types.ObjectId, ref: 'Plant', required: true},
    price: {type: Number, min:[0, 'Price must be a positive number']},
    expiration_date: {type: Date}
  }
);

// Virtual for Seed's name
SeedSchema
.virtual('name')
.get(function () {
  return  this.plant.name + ' seeds';
});
// Virtual for Seed's URL
SeedSchema
.virtual('url')
.get(function () {
  return '/catalog/seed/' + this._id;
});

//Export model
module.exports = mongoose.model('Seed', SeedSchema);