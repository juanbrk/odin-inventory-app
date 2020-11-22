var mongoose = require('mongoose');
const { DateTime } = require("luxon");


var Schema = mongoose.Schema;

var PlantSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    stock:{type: Number, min:0},
    price:{type: Number, min: [0, 'price must be a positive number']},
    family_name: {type: String, maxlength: 100},
    date_of_sow: {type: Date},
    status: {type: String, required: true, enum: ['Available', 'Sold out', 'Coming soon','Unavailable'], default: 'Available'},
    plant_type: {type: Schema.Types.ObjectId, ref: 'PlantType', required:true}
  }
);


// Virtual for plant's URL
PlantSchema
.virtual('url')
.get(function () {
  return '/catalog/plant/' + this._id;
});

PlantSchema
.virtual('sow_date_formatted')
.get(function () {
  return DateTime.fromJSDate(this.date_of_sow).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('Plant', PlantSchema);