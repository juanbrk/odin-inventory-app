var mongoose = require('mongoose');

const { DateTime } = require("luxon");

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

SeedSchema
.virtual('expiration_date_formatted')
.get(function () {
  let isThereADate = !!this.expiration_date;
  let formatted_date = isThereADate ? DateTime.fromJSDate(this.expiration_date).toLocaleString(DateTime.DATE_MED) : "-"
  return formatted_date;
});
SeedSchema
.virtual('formatted_price')
.get(function () {
  return this.price == undefined ? "-" : "$" + this.price.toFixed(2);
});



//Export model
module.exports = mongoose.model('Seed', SeedSchema);