const express=require('express');

const router=express.Router();

const proyectosController=require('../controllers/proyectosController');
//routes:


module.exports=function(){
    router.get('/',proyectosController.proyectosHome);
    router.get('/nuevo-proyecto',proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',proyectosController.nuevoProyecto)
    return router;
}
