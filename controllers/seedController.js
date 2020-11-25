var Seed = require('../models/seed');
var Plant = require('../models/plant');
var Brand = require('../models/brand');

const async = require('async');
const { body,validationResult } = require('express-validator');

// Display list of all Seeds.
exports.seed_list = function(req, res) {
    Seed.find({}, 'name brand plant')
    .populate('brand')
    .populate('plant')
    .exec(function (err, seeds) {
      if (err) { return next(err); }
      //Successful, so render
      console.log(`SEEDS %r`, seeds);
      res.render('seed_list', { title: 'Seed List', seed_list: seeds });
    });
};

// Display detail page for a specific Seed.
exports.seed_detail = function(req, res) {
    Seed.findById(req.params.id)
    .populate('plant')
    .populate('brand')
    .exec(function (err, seed) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('seed_detail', {seed: seed });
    });
};

// Display Seed create form on GET.
exports.seed_create_get = function(req, res) {
    // Get all plants and brands, which we can use for adding to our seed.
    async.parallel({
        plants: function(callback) {
            Plant.find({}, 'name', callback);
        },
        brands: function(callback) {
            Brand.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('seed_form', { title: 'New Seed', plants: results.plants, brands: results.brands });
    });
};

// Handle Seed create on POST.
exports.seed_create_post = [
    // Validate and sanitise fields.
    body('plant', 'select plant').trim().isLength({ min: 1 }).escape(),
    body('brand', 'select brand').trim().isLength({ min: 1 }).escape(),
    body('description', ).optional().trim().escape(),
    body('price').isCurrency().optional().escape(),
    body('exp_date', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Seed object with escaped and trimmed data.
        var seedInstance = new Seed(
          { plant: req.body.plant,
            brand: req.body.brand,
            description: req.body.description,
            expiration_date: req.body.exp_date,
            price: req.body.price 
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            async.parallel({
                plants: function(callback) {
                    Plant.find({}, 'name', callback);
                },
                brands: function(callback) {
                    Brand.find(callback);
                }
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('seed_form', { title: 'New Seed', plants: results.plants, brands: results.brands, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid.
            seedInstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(seedInstance.url);
                });
        }
    }
];

// Display Seed delete form on GET.
exports.seed_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Seed delete GET');
};

// Handle Seed delete on POST.
exports.seed_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Seed delete POST');
};

// Display Seed update form on GET.
exports.seed_update_get = function(req, res) {
    // Get Seed,  all plants and all brands, which we can use for adding to our seed.
    async.parallel({
        seed: function(callback){
            Seed.findById(req.params.id)
            .populate('plant')
            .populate('brand')
            .exec(callback)
        },
        plants: function(callback) {
            Plant.find({}, 'name', callback);
        },
        brands: function(callback) {
            Brand.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.seed==null) { // No results.
            var err = new Error('Seed not found');
            err.status = 404;
            return next(err);
        }
        res.render('seed_form', { title: 'Update Seed', plants: results.plants, brands: results.brands, seed: results.seed });
    });
};

// Handle Seed update on POST.
exports.seed_update_post = [
   
     // Validate and sanitise fields.
     body('plant', 'select plant').trim().isLength({ min: 1 }).escape(),
     body('brand', 'select brand').trim().isLength({ min: 1 }).escape(),
     body('description', ).optional().trim().escape(),
     body('price').isCurrency().optional().escape(),
     body('exp_date', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var seedInstance = new Seed(
            { 
                plant: req.body.plant,
                brand: req.body.brand,
                description: req.body.description,
                expiration_date: req.body.exp_date,
                price: req.body.price 
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
                plants: function(callback) {
                    Plant.find({}, 'name', callback);
                },
                brands: function(callback) {
                    Brand.find(callback);
                },
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('seed_form', { title: 'New Item', brands: results.brands, plants: results.plants, errors: errors.array() });
            });
            return;
        }
        else {
            seedInstance._id = req.params.id //This is required, or a new ID will be assigned!
            // Data from form is valid. Update the record.
            Seed.findByIdAndUpdate(req.params.id, seedInstance, {}, function (err,theseed) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(theseed.url);
                });
        }
    }
];
