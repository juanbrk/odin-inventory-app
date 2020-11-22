var Brand = require('../models/brand');
var Item = require('../models/item');
var Seed = require('../models/seed');

var async = require('async');
const { body,validationResult } = require("express-validator");


// Display list of all Brands.
exports.brand_list = function(req, res) {
    Brand.find({}, 'name')
    .exec(function(err, brands){
        if(err){ return next(err); }
        //successful, so render
        res.render('brand_list', {title : 'Brands List', brand_list : brands});
    });
};

// Display detail page for a specific Brand.
exports.brand_detail = function(req, res, next) {
    async.parallel({
        brand: function(callback) {
            Brand.findById(req.params.id)
              .exec(callback);
        },

        brand_items: function(callback) {
            Item.find({ 'brand': req.params.id })
              .exec(callback);
        },
        brand_seeds: function(callback) {
            Seed.find({ 'brand': req.params.id }, 'name brand plant description')
                .populate('plant', 'name')
                .exec(callback);
        }

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.brand==null) { // No results.
            var err = new Error('Brand not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('brand_detail', { title: 'Brand Detail', brand: results.brand, brand_items: results.brand_items, brand_seeds: results.brand_seeds } );
    });
};

// Display Brand create form on GET.
exports.brand_create_get = function(req, res) {
    res.render('brand_form', { title: 'Create New Brand' });
};

// Handle Brand create on POST.
exports.brand_create_post =  [
   
    // Validate and santise the name field.
    body('name', 'Brand name required').trim().isLength({ min: 1 }).escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a brand object with escaped and trimmed data.
      var brand = new Brand(
        { name: req.body.name }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('brand_form', { title: 'Create Brand', brand: brand, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if Brand with same name already exists.
        Brand.findOne({ 'name': req.body.name })
          .exec( function(err, found_brand) {
             if (err) { return next(err); }
  
             if (found_brand) {
               // Brand exists, redirect to its detail page.
               res.redirect(found_brand.url);
             }
             else {

               brand.save(function (err) {
                 if (err) { return next(err); }
                 // Brand saved. Redirect to brand detail page.
                 res.redirect(brand.url);
               });
             }  
           });
      }
    }
  ];

// Display Brand delete form on GET.
exports.brand_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Brand delete GET');
};

// Handle Brand delete on POST.
exports.brand_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Brand delete POST');
};

// Display Brand update form on GET.
exports.brand_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Brand update GET');
};

// Handle Brand update on POST.
exports.brand_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Brand update POST');
};
