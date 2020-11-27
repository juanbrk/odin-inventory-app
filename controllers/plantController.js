var Plant = require('../models/plant');
var Seed = require('../models/seed');
var Item = require('../models/item');
var PlantType = require('../models/plant_type');

var async = require('async');
const { body,validationResult } = require('express-validator');


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
            Item.countDocuments({}, callback);
        }

    }, function(err, results) {
        const user = undefined===req.user ? undefined : req.user;
        res.render('index', { title: 'Plant inventory Home', error: err, data: results, user: user });
    });
};

// Display list of all Plants.
exports.plant_list = function(req, res) {
    Plant.find({}, 'name plant_type price status')
    .populate('plant_type')
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
    // Get all  plant types which we can use for adding to our plant.
    async.parallel({
        plant_types: function(callback) {
            PlantType.find({}, 'name', callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('plant_form', { title: 'New Plant', plant_types: results.plant_types });
    });
};

// Handle Plant create on POST.
exports.plant_create_post = [
    // Validate and sanitise fields.
    body('name', 'Name not specified').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status not selected').trim().isIn(['Available', 'Sold out', 'Coming soon','Unavailable']).isLength({ min: 1 }).escape(),
    body('plant_type', 'Plant Type not selected').trim().isLength({ min: 1 }).escape(),
    body('stock', 'Invalid stock').trim().optional().isNumeric().escape(),
    body('date_of_sow','Invalid date of sow' ).optional({ checkFalsy: true }).isISO8601().toDate(),
    body('price').isCurrency().isNumeric().optional().escape(),
    body('family_name', 'Invalid family name').optional({ checkFalsy: true }).trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Plant object with escaped and trimmed data.
        var plant = new Plant(
          { name: req.body.name,
            status: req.body.status,
            plant_type: req.body.plant_type,
            stock: req.body.stock,
            date_of_sow: req.body.date_of_sow,
            price: req.body.price,
            family_name: req.body.family_name
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            async.parallel({
                plant_types: function(callback) {
                    PlantType.find({}, 'name', callback);
                },
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('plant_form', { title: 'New Plant', plant_types: results.plant_types, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid.
            plant.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(plant.url);
                });
        }
    }
];

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
    async.parallel({
        plant: function(callback){
            Plant.findById(req.params.id)
            .populate('plant_type')
            .exec(callback);
        },
        plant_types: function(callback) {
            PlantType.find({}, 'name', callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.plant==null) { // No results.
            var err = new Error('Plant not found');
            err.status = 404;
            return next(err);
        }
        res.render('plant_form', { title: 'Update Plant', plant_types: results.plant_types, plant:results.plant });
    });
};

// Handle Plant update on POST.
exports.plant_update_post = [
   
    // Validate and sanitise fields.
    body('name', 'Name not specified').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status not selected').trim().isIn(['Available', 'Sold out', 'Coming soon','Unavailable']).isLength({ min: 1 }).escape(),
    body('plant_type', 'Plant Type not selected').trim().isLength({ min: 1 }).escape(),
    body('stock', 'Invalid stock').trim().optional().isNumeric().escape(),
    body('date_of_sow','Invalid date of sow' ).optional({ checkFalsy: true }).isISO8601().toDate(),
    body('price').isCurrency().isNumeric().optional().escape(),
    body('family_name', 'Invalid family name').optional({ checkFalsy: true }).trim().isLength({ min: 1 }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create a Plant object with escaped and trimmed data.
        var plant = new Plant(
            { name: req.body.name,
              status: req.body.status,
              plant_type: req.body.plant_type,
              stock: req.body.stock,
              date_of_sow: req.body.date_of_sow,
              price: req.body.price,
              family_name: req.body.family_name
             });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            async.parallel({
                plant_types: function(callback) {
                    PlantType.find({}, 'name', callback);
                },
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('plant_form', { title: 'New Plant', plant_types: results.plant_types, plant: plant, errors: errors.array() });
            });
            return;
        }
        else {
            
            // Data from form is valid. Update the record.
            plant._id=req.params.id //This is required, or a new ID will be assigned!
            Plant.findByIdAndUpdate(req.params.id, plant, {}, function (err,theplant) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(theplant.url);
                });
        }
    }
];
