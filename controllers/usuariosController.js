const Usuarios=require('../models/Usuarios')
const Sequelize=require('sequelize');
const main = require('../handler/email');

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
        // url de confirmar
        const confirmarUrl=`http://${req.headers.host}/confirmar/${email}`;
        // console.log(confirmarUrl);
        // console.log(password);
        // objeto de usuario
        const usuario={
            email
        }
        // enmviar email
        await main({
            usuario,
            subject:'Confirma tu cuenta upTast',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });
        // redirigir
        req.flash('correcto','Enviamos un correo, confirma tu  cuenta');
        res.redirect('/iniciar-sesion')
        // console.log('cASI');
    } catch (error) {
        let todos=error.errors;
        // console.log(error.errors)
        if(!todos)return;
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