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
    ,proyectosController.nuevoProyecto);

    router.get('/proyectos/:url',proyectosController.proyectoPorUrl)

    // update p
    router.get('/proyecto/editar/:id',proyectosController.formularioEditar)
    return router;
}
