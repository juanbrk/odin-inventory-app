var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlantTypeSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    description: {type: String, maxlength:250}
  }
);


// Virtual for plant type's URL
PlantTypeSchema
.virtual('url')
.get(function () {
  return '/catalog/plant-type/' + this._id;
});

//Export model
module.exports = mongoose.model('PlantType', PlantTypeSchema);