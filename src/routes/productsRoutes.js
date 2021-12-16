const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

// ************ Controller Require ************
const upload = require('../middlewares/upload');


/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
/*** SUBMIT CREATE ONE PRODUCT ***/
router.post('/', upload.single('image'), productsController.store);

/*** GET ONE PRODUCT (DETAIL) ***/
router.get('/:id', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
/*** SUBMIT EDIT ONE PRODUCT ***/
router.put('/:id', upload.single('image'), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', productsController.destroy);

module.exports = router;
