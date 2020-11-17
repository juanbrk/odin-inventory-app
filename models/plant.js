var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlantSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    stock:{type: Number, min:0},
    family_name: {type: String, maxlength: 100},
    date_of_sow: {type: Date},
    type: {type: String, maxlength:100},
    status: {type: String, required: true, enum: ['Available', 'Sold out', 'Coming soon','Unavailable'], default: 'Available'},
  }
);


// Virtual for plant's URL
PlantSchema
.virtual('url')
.get(function () {
  return '/catalog/plant/' + this._id;
});

//Export model
module.exports = mongoose.model('Plant', PlantSchema);