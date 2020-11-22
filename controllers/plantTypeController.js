var PlantType = require('../models/plant_type');

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
    res.send('NOT IMPLEMENTED: PlantType create GET');
};

// Handle PlantType create on POST.
exports.plant_type_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: PlantType create POST');
};

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
