const express=require('express');

const router=express.Router();

const{body}=require('express-validator');

const proyectosController=require('../controllers/proyectosController');
const usuariosController =require('../controllers/usuariosController');
const authController=require('../controllers/authController');

const tareasController=require('../controllers/tareasController');


//routes:

module.exports=function(){
    router.get('/',[authController.usuarioAutenticado],proyectosController.proyectosHome);
    router.get('/nuevo-proyecto',[authController.usuarioAutenticado],proyectosController.formularioProyecto)
    router.post('/nuevo-proyecto',[authController.usuarioAutenticado],
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.nuevoProyecto);

    router.get('/proyectos/:url',[authController.usuarioAutenticado],proyectosController.proyectoPorUrl)

    // update p
    router.get('/proyecto/editar/:id',[authController.usuarioAutenticado],proyectosController.formularioEditar)

    router.post('/nuevo-proyecto/:id',[authController.usuarioAutenticado],
    body('nombre').not().isEmpty().trim().escape()
    ,proyectosController.actualizarProyecto);

    //delete project
    router.delete('/proyectos/:url',[authController.usuarioAutenticado],proyectosController.eliminarProyecto);


    //Tareas:
    router.post('/proyectos/:url',[authController.usuarioAutenticado],tareasController.agregarTarea)

    //ActualizarTarea
    router.patch('/tareas/:id',[authController.usuarioAutenticado],tareasController.cambiarEstadoTarea)

    //delete tarea
    router.delete('/tareas/:id',[authController.usuarioAutenticado],tareasController.eliminarTarea)


    // NUEVA CUENTA
    router.get('/crear-cuenta',usuariosController.formCrearCuenta)
    router.post('/crear-cuenta',usuariosController.crearCuenta)

    // iniciar sesión:
    router.get('/iniciar-sesion',usuariosController.formIniciarSesión)
    router.post('/iniciar-sesion',authController.autenticarUsuario)

    router.get('/cerrar-sesion',authController.cerrarSesion)

    router.get('/reestablecer',usuariosController.formRestablecerPass)

    router.post('/reestablecer',authController.enviarToken);
    router.get('/reestablecer/:token',authController.resetPassword);



    return router;
}
