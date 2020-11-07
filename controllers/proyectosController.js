// const { ne } = require('sequelize/types/lib/operators');
const slug = require('slug');
const Proyectos=require('../models/Proyectos');
exports.proyectosHome=async (req,res)=>{

    const proyectos=await Proyectos.findAll();

    res.render('index',{
        nombrePagina: 'Proyectos',
        proyectos
    });
}
exports.formularioProyecto=async(req,res)=>{
    const proyectos=await Proyectos.findAll();

    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos
    })
}
exports.nuevoProyecto=async(req,res)=>{
    // res.send('Enviaste el formulario')
    //send data
    // console.log(req.body);
    const proyectos=await Proyectos.findAll();

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
        const proyecto=await Proyectos.create({nombre});
        res.redirect('/');

    }
}

exports.proyectoPorUrl=async(req,res,next)=>{
    // res.send(req.params.url);
    const proyectos=await Proyectos.findAll();
    const proyecto=await Proyectos.findOne({
        where:{
            url:req.params.url
        }
    });
    if(!proyecto) return next();
    // res.send('ok');

    res.render('tareas',{
        nombrePagina:'Tareas del proyecto',
        proyecto,
        proyectos
    })
}
