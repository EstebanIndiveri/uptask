// const { ne } = require('sequelize/types/lib/operators');
const slug = require('slug');
const Proyectos=require('../models/Proyectos');
const Tareas=require('../models/Tareas');
exports.proyectosHome=async (req,res)=>{

    const usuarioId=res.locals.usuario.id;
    const proyectos=await Proyectos.findAll({where:{usuarioId}});

    res.render('index',{
        nombrePagina: 'Proyectos',
        proyectos
    });
}
exports.formularioProyecto=async(req,res)=>{
    const usuarioId=res.locals.usuario.id;
    const proyectos=await Proyectos.findAll({where:{usuarioId}});

    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    })
}
exports.nuevoProyecto=async(req,res)=>{
    // res.send('Enviaste el formulario')
    //send data
    // console.log(req.body);
    const usuarioId=res.locals.usuario.id;
    const proyectos=await Proyectos.findAll({where:{usuarioId}});

    const {nombre}=req.body;
    let errores=[];
    if(!nombre || nombre.trim()==='' || nombre.trim()===undefined){
        errores.push({'texto':'Agrega un nombre al proyecto'})
        console.log(erroes);
    }
    if(errores.length > 0){

        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        })
 
    
    }else{
        //insert DB
        // const url=(slug(nombre).toLowerCase());
        const usuarioId=res.locals.usuario.id;
        const proyecto=await Proyectos.create({nombre,usuarioId});
        res.redirect('/');

    }
}

exports.proyectoPorUrl=async(req,res,next)=>{
    // res.send(req.params.url);

    const usuarioId=res.locals.usuario.id;
    const proyectosPromise= Proyectos.findAll({where:{usuarioId}});

    // const proyectosPromise= Proyectos.findAll();
    const proyectPromise= Proyectos.findOne({
        where:{
            url:req.params.url,
            usuarioId
        }
    });
    const[proyectos,proyecto]=await Promise.all([proyectosPromise,proyectPromise]);
    
    const tareas=await Tareas.findAll({
        where:{
            proyectoId:proyecto.id
        }
        // include:[
        //     {model:Proyectos}
        // ]
    });
    
    // console.log(tareas);
    
    if(!proyecto) return next();
    // res.send('ok');


    res.render('tareas',{
        nombrePagina:'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar=async(req,res)=>{

    const usuarioId=res.locals.usuario.id;
    const proyectosPromise= Proyectos.findAll({where:{usuarioId}});
    
    // const proyectosPromise= Proyectos.findAll();
    const proyectPromise= Proyectos.findOne({
        where:{
            id:req.params.id,
            usuarioId
        }
    });
    const[proyectos,proyecto]=await Promise.all([proyectosPromise,proyectPromise]);

    res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyectos,
        proyecto
    })
}


exports.actualizarProyecto=async(req,res)=>{
    // res.send('Enviaste el formulario')
    //send data
    // console.log(req.body);
    const usuarioId=res.locals.usuario.id;
    const proyectos=await Proyectos.findAll({where:{usuarioId}});

    // const proyectos=await Proyectos.findAll();

    const {nombre}=req.body;
    let errores=[];
    if(!nombre || nombre.trim()==='' || nombre.trim()===undefined){
        errores.push({'texto':'Agrega un nombre al proyecto'})
        console.log(erroes);
    }
    if(errores.length > 0){

        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        })
 
    
    }else{
        //insert DB
        // const url=(slug(nombre).toLowerCase());
        const proyecto=await Proyectos.update({nombre:nombre},
            {where:{id:req.params.id}}
            );
        res.redirect('/');

    }
}
exports.eliminarProyecto=async(req,res,next)=>{
    const{urlProyecto}=req.query;

    const resultado=await Proyectos.destroy({where:{url:urlProyecto}});

    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado correctamente');
}