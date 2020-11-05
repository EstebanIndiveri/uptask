const express=require('express');

const router=express.Router();

const{body}=require('express-validator');

const proyectosController=require('../controllers/proyectosController');
//routes:


module.exports=function(){
    router.get('/',proyectosController.proyectosHome);
    router.get('/nuevo-proyecto',proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.nuevoProyecto)
    return router;
}
