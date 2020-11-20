var Seed = require('../models/seed');

// Display list of all Seeds.
exports.seed_list = function(req, res) {
    Seed.find({}, 'name brand ')
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
    res.send('NOT IMPLEMENTED: Seed detail: ' + req.params.id);
};

// Display Seed create form on GET.
exports.seed_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Seed create GET');
};

// Handle Seed create on POST.
exports.seed_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Seed create POST');
};

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
    res.send('NOT IMPLEMENTED: Seed update GET');
};

// Handle Seed update on POST.
exports.seed_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Seed update POST');
};
