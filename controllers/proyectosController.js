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
    res.send('Enviaste el formulario')
}
