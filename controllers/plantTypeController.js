var PlantType = require('../models/plant_type');

const { body,validationResult } = require("express-validator");

// Display list of all PlantTypes.
exports.plant_type_list = function(req, res) {
    PlantType.find({}, 'name description')
    .exec(function(err, types){
        if(err){ return next(err); }
        //successful, so render
        res.render('types_list', {title : 'PlantTypes List', types_list : types});
    });
};

// Display detail page for a specific PlantType.
exports.plant_type_detail = function(req, res) {
    PlantType.findById(req.params.id)
    .exec(function (err, plant_type) {
      if (err) { return next(err); }
      // Successful, so render
      res.render('plant_type_detail', {plant_type: plant_type });
    });
};

// Display PlantType create form on GET.
exports.plant_type_create_get = function(req, res) {
    res.render('plant_type_form', { title: 'Create New Plant Type' });
};

// Handle PlantType create on POST.
exports.plant_type_create_post = [
   
    // Validate and santise the name field.
    body('name', 'Plant Type name required').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description is not correct' ).optional().trim().escape(),
  
    // Process request after validation and sanitization.
    (req, res, next) => {
  
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a plant_type object with escaped and trimmed data.
      var plant_type = new PlantType(
        { 
            name: req.body.name,
            description: req.body.description
        }
      );
  
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render('plant_type_form', { title: 'Create PlantType', plant_type: plant_type, errors: errors.array()});
        return;
      }
      else {
        // Data from form is valid.
        // Check if PlantType with same name already exists.
        PlantType.findOne({ 'name': req.body.name })
          .exec( function(err, found_plant_type) {
             if (err) { return next(err); }
  
             if (found_plant_type) {
               // PlantType exists, redirect to its detail page.
               res.redirect(found_plant_type.url);
             }
             else {

               plant_type.save(function (err) {
                 if (err) { return next(err); }
                 // PlantType saved. Redirect to plant_type detail page.
                 res.redirect(plant_type.url);
               });
             }  
           });
      }
    }
  ];

// Display PlantType delete form on GET.
exports.plant_type_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: PlantType delete GET');
};

// Handle PlantType delete on POST.
exports.plant_type_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: PlantType delete POST');
};

// Display PlantType update form on GET.
exports.plant_type_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: PlantType update GET');
};

// Handle PlantType update on POST.
exports.plant_type_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: PlantType update POST');
};
