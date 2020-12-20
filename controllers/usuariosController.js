const Usuarios=require('../models/Usuarios')

exports.formCrearCuenta=(req,res,next)=>{
    res.render('crearCuenta',{
        nombrePagina:'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesión=(req,res,next)=>{
    const{error}=res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina:'Iniciar Sesión en Uptask',
        error
    })
}


exports.crearCuenta=async(req,res,next)=>{
    //leer datos
    const{email,password}=req.body;

    try {
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion')
    } catch (error) {
        let todos=error.errors;
        // console.log(error.errors)
        todos.map((elemnt)=>{
            if(elemnt.message==='usuarios.usuarios_email_unique must be unique'){
                let algo=elemnt.message='El email ya se encuentra registrado';
                console.log(algo);
            }
        })
        req.flash('error',error.errors.map(error=>error.message));
        res.render('crearCuenta',{
        // errores:error.errors,
        mensajes:req.flash(),
        nombrePagina:'Crear Cuenta en Uptask',
        email,
        password
        });
    }

}

exports.formRestablecerPass=(req,res)=>{
    res.render('reestablecer',{
        nombrePagina:'Reestablecer tu contraseña',
    })
}