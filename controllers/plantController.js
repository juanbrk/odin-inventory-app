var Plant = require('../models/plant');
var Seed = require('../models/seed');
var PlantType = require('../models/plant_type');

var async = require('async');


exports.index = function(req, res) {   
    
    async.parallel({
        plant_count: function(callback){
            Plant.countDocuments({}, callback);
        },
        plant_type_count: function(callback) {
            PlantType.countDocuments({}, callback);
        },
        seed_count: function(callback) {
            Seed.countDocuments({}, callback);
        },
        item_count: function(callback) {
            Plant.countDocuments({}, callback);
        }

    }, function(err, results) {
        res.render('index', { title: 'Plant inventory Home', error: err, data: results });
    });
};

// Display list of all Plants.
exports.plant_list = function(req, res) {
    Plant.find({}, 'name plant_type price status')
    .exec(function (err, plants) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(`PLANTS %p`, plants);
      res.render('plant_list', { title: 'Plant List', plant_list: plants });
    });
};

// Display detail page for a specific Plant.
exports.plant_detail = function(req, res) {
    Plant.findById(req.params.id)
    .populate('plant_type')
    .exec(function (err, plant) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('plant_detail', {plant: plant });
    });
};

// Display Plant create form on GET.
exports.plant_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant create GET');
};

// Handle Plant create on POST.
exports.plant_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant create POST');
};

// Display Plant delete form on GET.
exports.plant_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant delete GET');
};

// Handle Plant delete on POST.
exports.plant_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant delete POST');
};

// Display Plant update form on GET.
exports.plant_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant update GET');
};

// Handle Plant update on POST.
exports.plant_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant update POST');
};
