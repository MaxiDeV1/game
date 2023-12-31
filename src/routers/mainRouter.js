const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path")
const mainController = require("../controllers/mainController");

// para subir imagenes ******

let storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/images");
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})
let upload = multer({ storage })

//Middleware de validacion de carga

const validation = require("../middlewares/itemsValidator");


 // enrutamiento *************

router.get("/", mainController.index);
router.get("/create",mainController.cargaGet);
router.get("/productos-detail/:id", mainController.details);


router.get("/register", mainController.register);

router.get("/carrito", mainController.carrito );

router.get("/login", mainController.login);


router.get("/create",mainController.cargaGet);


router.post("/productos-detail",upload.single("img"), validation.createValidation ,mainController.addDetails);

router.get("/productos-detail/:id/edit", mainController.edit)
router.put("/productos-detail/:id", mainController.update)

router.delete("/productos-detail/:id",mainController.destroy)



module.exports = router;