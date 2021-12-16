// Acá nos falta express y el router
const express = require('express');
const router = express.Router();

// Aća nos falta traer el controller

const mainController = require("../controllers/mainController");

// Acá definimos las rutas
router.get('/', mainController.index);
router.get("/productCart", mainController.productCart);
router.get("/index", mainController.index);
//router.get("/productDetail", mainController.productDetail);
//router.get("/newProduct", mainController.newProduct);
//router.get("/editProduct", mainController.editProduct);

// Acá exportamos el resultado

module.exports = router;

//