const Proyectos=require('../models/Proyectos');
const Tareas=require('../models/Tareas');

exports.agregarTarea=async(req,res,next)=>{
    // res.send('Enviado');
    //´proyecto
    const proyecto=await Proyectos.findOne({where:{url:req.params.url}});

    const{tarea}=req.body;

    const estado=0;
    const proyectoId=proyecto.id;

    //insert
    const resultado=await Tareas.create({tarea,estado,proyectoId})

    if(!resultado){
        return next();
    }

    //res
    // res.redirect(`{http://localhost:3000}/proyectos/${req.params.url}`);

    res.redirect(`${window.location.host}/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea=async(req,res,next)=>{
    const{id}=req.params;
    const tarea=await Tareas.findOne({where:{id}});

    //estado
    let estado=0;
    if(tarea.estado===estado){
        estado=1;
    }
    tarea.estado=estado;

    const resultado=await tarea.save();

    if(!resultado){
        return next();
    }

    res.status(200).send('Actualizado');
}

exports.eliminarTarea=async(req,res,next)=>{
    // console.log(req.query);
    const{id}=req.params;
    const{nameTarea}=req.query;
    // console.log(nameTarea);
    const response=await Tareas.destroy({where:{id}});
    if(!response)return next();
    // console.log(id);
    res.status(200).send(`Tarea: ${nameTarea} // Eliminada correctamente`);
}