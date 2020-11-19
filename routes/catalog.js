var express = require('express');
var router = express.Router();

// Require controller modules.
var plant_controller = require('../controllers/plantController');
var brand_controller = require('../controllers/brandController');
var category_controller = require('../controllers/categoryController');
var plant_type_controller = require('../controllers/plantTypeController');
var item_controller = require('../controllers/itemController');
var seed_controller = require('../controllers/seedController');


// GET catalog home page.
router.get('/', plant_controller.index);

/// PLANT ROUTES ///

// GET request for creating a Plant. NOTE This must come before routes that display Plant (uses id).
router.get('/plant/create', plant_controller.plant_create_get);

// POST request for creating Plant.
router.post('/plant/create', plant_controller.plant_create_post);

// GET request to delete Plant.
router.get('/plant/:id/delete', plant_controller.plant_delete_get);

// POST request to delete Plant.
router.post('/plant/:id/delete', plant_controller.plant_delete_post);

// GET request to update Plant.
router.get('/plant/:id/update', plant_controller.plant_update_get);

// POST request to update Plant.
router.post('/plant/:id/update', plant_controller.plant_update_post);

// GET request for one Plant.
router.get('/plant/:id', plant_controller.plant_detail);

// GET request for list of all Plant items.
router.get('/plants', plant_controller.plant_list);

/// BRAND ROUTES ///

// GET request for creating Brand. NOTE This must come before route for id (i.e. display brand).
router.get('/brand/create', brand_controller.brand_create_get);

// POST request for creating Brand.
router.post('/brand/create', brand_controller.brand_create_post);

// GET request to delete Brand.
router.get('/brand/:id/delete', brand_controller.brand_delete_get);

// POST request to delete Brand.
router.post('/brand/:id/delete', brand_controller.brand_delete_post);

// GET request to update Brand.
router.get('/brand/:id/update', brand_controller.brand_update_get);

// POST request to update Brand.
router.post('/brand/:id/update', brand_controller.brand_update_post);

// GET request for one Brand.
router.get('/brand/:id', brand_controller.brand_detail);

// GET request for list of all Brands.
router.get('/brands', brand_controller.brand_list);

/// CATEGORY ROUTES ///

// GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
router.get('/category/create', category_controller.category_create_get);

//POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Category.
router.get('/categories', category_controller.category_list);

// PLANT TYPES REQUESTS //

// GET request for creating a Plant Type. NOTE This must come before route that displays Plant Type (uses id).
router.get('/plant-type/create', plant_type_controller.plant_type_create_get);

// POST request for creating Plant Type. 
router.post('/plant-type/create', plant_type_controller.plant_type_create_post);

// GET request to delete Plant Type.
router.get('/plant-type/:id/delete', plant_type_controller.plant_type_delete_get);

// POST request to delete Plant Type.
router.post('/plant-type/:id/delete', plant_type_controller.plant_type_delete_post);

// GET request to update Plant Type.
router.get('/plant-type/:id/update', plant_type_controller.plant_type_update_get);

// POST request to update Plant Type.
router.post('/plant-type/:id/update', plant_type_controller.plant_type_update_post);

// GET request for one Plant Type.
router.get('/plant-type/:id', plant_type_controller.plant_type_detail);

// GET request for list of all Plant Type.
router.get('/plant-types', plant_type_controller.plant_type_list);

/// ITEM ROUTES ///

// GET request for creating a Item. NOTE This must come before route that displays Item (uses id).
router.get('/item/create', item_controller.item_create_get);

// POST request for creating Item. 
router.post('/item/create', item_controller.item_create_post);

// GET request to delete Item.
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete Item.
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update Item.
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update Item.
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one Item.
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all Item.
router.get('/items', item_controller.item_list);


// SEED ROUTES //


// GET request for creating a Seed. NOTE This must come before route that displays Seed (uses id).
router.get('/seed/create', seed_controller.seed_create_get);

// POST request for creating Seed. 
router.post('/seed/create', seed_controller.seed_create_post);

// GET request to delete Seed.
router.get('/seed/:id/delete', seed_controller.seed_delete_get);

// POST request to delete Seed.
router.post('/seed/:id/delete', seed_controller.seed_delete_post);

// GET request to update Seed.
router.get('/seed/:id/update', seed_controller.seed_update_get);

// POST request to update Seed.
router.post('/seed/:id/update', seed_controller.seed_update_post);

// GET request for one Seed.
router.get('/seed/:id', seed_controller.seed_detail);

// GET request for list of all Seed.
router.get('/seeds', seed_controller.seed_list);




module.exports = router;