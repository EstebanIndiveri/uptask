exports.proyectosHome=(req,res)=>{
    res.render('index',{
        nombrePagina: 'Proyectos'
    });
}
exports.formularioProyecto=(req,res)=>{
    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto'
    })
}
exports.nuevoProyecto=(req,res)=>{
    // res.send('Enviaste el formulario')
    //send data
    // console.log(req.body);
    const {nombre}=req.body;
    let errores=[];
    if(!nombre || nombre.trim()==='' || nombre.trim()===undefined){
        errores.push({'texto':'Agrega un nombre al proyecto'})
    }
    if(errores.length > 0){

        res.render('nuevoProyecto',{
            nombrePagina:'Nuevo Proyecto',
            errores
        })
    }
}
