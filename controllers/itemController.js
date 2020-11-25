var Item = require('../models/item');
var Brand = require('../models/brand');
var Category = require('../models/category');

const async = require('async');
const { body,validationResult } = require('express-validator');

// Display list of all Items.
exports.item_list = function(req, res) {
    Item.find({}, 'name brand')
    .populate('brand')
    .exec(function (err, items) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('item_list', { title: 'Item List', item_list: items });
    });
};

// Display detail page for a specific Item.
exports.item_detail = function(req, res) {
    Item.findById(req.params.id, 'name description status price')
    .populate('category', 'name')
    .populate('brand', 'name')
    .exec(function (err, item) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('item_detail', {item: item });
    });
};

// Display Item create form on GET.
exports.item_create_get = function(req, res) {
    // Get all brands and brands, which we can use for adding to our seed.
    async.parallel({
        brands: function(callback) {
            Brand.find({}, 'name', callback);
        },
        categories: function(callback) {
            Category.find({}, 'name', callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        console.log(`RESULTS %o`, results);
        res.render('item_form', { title: 'New Item', brands: results.brands, categories: results.categories });
    });
};

// Handle Item create on POST.
exports.item_create_post = [
    // Validate and sanitise fields.
    body('name', 'Name not specified').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status not selected').trim().isLength({ min: 1 }).escape(),
    body('category', 'Category not selected').trim().isLength({ min: 1 }).escape(),
    body('brand', 'select brand').trim().isLength({ min: 1 }).escape(),
    body('description', ).optional().trim().escape(),
    body('price').isCurrency().optional().escape(),
    body('stock', 'Invalid stock').optional({ checkFalsy: true }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Item object with escaped and trimmed data.
        var item = new Item(
          { name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            stock: req.body.stock,
            category: req.body.category,
            status: req.body.status,
            price: req.body.price,
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            async.parallel({
                brands: function(callback) {
                    Brand.find({}, 'name', callback);
                },
                categories: function(callback) {
                    Category.find({}, 'name', callback);
                },
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('item_form', { title: 'New Item', brands: results.brands, categories: results.categories, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid.
            item.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(item.url);
                });
        }
    }
];

// Display Item delete form on GET.
exports.item_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Item delete GET');
};

// Handle Item delete on POST.
exports.item_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Item delete POST');
};

// Display Item update form on GET.
exports.item_update_get = function(req, res) {
    // Get brand, and categories for form.
    async.parallel({
        item: function(callback){
            Item.findById(req.params.id)
            .populate('category')
            .populate('brand')
            .exec(callback);
        },
        brands: function(callback) {
            Brand.find({}, 'name', callback);
        },
        categories: function(callback) {
            Category.find({}, 'name', callback);
        },
    }, function(err, results) {
            if (err) { return next(err); }
            if (results.item==null) { // No results.
                var err = new Error('Item not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('item_form', { title: 'Update Item', categories: results.categories, brands: results.brands, item: results.item });
        });
};

// Handle Item update on POST.
exports.item_update_post = [
   
    // Validate and sanitise fields.
    body('name', 'Name not specified').trim().isLength({ min: 1 }).escape(),
    body('status', 'Status not selected').trim().isLength({ min: 1 }).escape(),
    body('category', 'Category not selected').trim().isLength({ min: 1 }).escape(),
    body('brand', 'select brand').trim().isLength({ min: 1 }).escape(),
    body('description', ).optional().trim().escape(),
    body('price').isCurrency().optional().escape(),
    body('stock', 'Invalid stock').optional({ checkFalsy: true }).escape(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Book object with escaped/trimmed data and old id.
        var item = new Item(
            { name: req.body.name,
              brand: req.body.brand,
              description: req.body.description,
              stock: req.body.stock,
              category: req.body.category,
              status: req.body.status,
              price: req.body.price,
              _id:req.params.id //This is required, or a new ID will be assigned!
             });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            async.parallel({
                brands: function(callback) {
                    Brand.find({}, 'name', callback);
                },
                categories: function(callback) {
                    Category.find({}, 'name', callback);
                },
            }, function (err, results) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('item_form', { title: 'New Item', brands: results.brands, categories: results.categories, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Item.findByIdAndUpdate(req.params.id, item, {}, function (err,theitem) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.redirect(theitem.url);
                });
        }
    }
];
