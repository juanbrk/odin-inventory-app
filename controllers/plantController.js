var Plant = require('../models/plant');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Plants.
exports.plant_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant list');
};

// Display detail page for a specific Plant.
exports.plant_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Plant detail: ' + req.params.id);
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