const express = require('express');
const router = express.Router();
const path = require('path');

const usersController = require('../controllers/usersController');

//****express-valditor *////
const {body} = require("express-validator");


//***** MULTER **** */// Para guardar imagenes
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/images/avatars');
    },
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      );
    }
  });

const uploadFile= multer({storage});


///**** VALIDACIONES ****////
const validations = [
    body("fullName").notEmpty().withMessage("El nombre debe estar completo"),
    body("email").notEmpty().withMessage("Tienes que escribir un correo electrónico válido").bail()
    .isEmail().withMessage("Desbes escribir un correo electrónico válido"),
    body("password").notEmpty().withMessage("Tienes que escribir una contraseña"),
    body("direction").notEmpty().withMessage("Tu dirección es obligatoria!"),
    body("avatar").custom((value, {req})=> {
      let file = req.file;
      let acceptedExtensions = [".jgp", ".png", ".gif", ".jpeg"];
      
      if (!file) {
        throw new Error("Debes subir una imagen");
      } //else { 
        //let fileExtension = path.extname(file.originalname);
        //if (!acceptedExtensions.includes(fileExtension)) {
        //throw new Error(`Las extenciones de archivos permitidas son ${acceptedExtensions.join(", ")}`);
      //}
    //}
      return true;
    })
]

// MIDDLEWARES
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");



//FORMULARIO DE LOGIN
router.get("/login", guestMiddleware, usersController.login);

// PROCESAR EL LOGIN
router.post("/login", usersController.loginProcess);


router.get("/register", guestMiddleware, usersController.register);

router.post("/register", uploadFile.single("avatar"), validations, usersController.processRegister);

router.get("/profile", authMiddleware, usersController.profile);

// LOGOUT
router.get("/logout", usersController.logout);


module.exports = router;