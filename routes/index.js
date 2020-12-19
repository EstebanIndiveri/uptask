const express=require('express');

const router=express.Router();

const{body}=require('express-validator');

const proyectosController=require('../controllers/proyectosController');
const usuariosController =require('../controllers/usuariosController');


const tareasController=require('../controllers/tareasController');


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

    router.post('/nuevo-proyecto/:id',
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.actualizarProyecto);


    //delete project

    router.delete('/proyectos/:url',proyectosController.eliminarProyecto);


    //Tareas:
    router.post('/proyectos/:url',tareasController.agregarTarea)

    //ActualizarTarea
    router.patch('/tareas/:id',tareasController.cambiarEstadoTarea)

    //delete tarea
    router.delete('/tareas/:id',tareasController.eliminarTarea)


    // NUEVA CUENTA
    router.get('/crear-cuenta',usuariosController.formCrearCuenta)

    router.post('/crear-cuenta',usuariosController.crearCuenta)


    return router;
}
