const passport=require('passport');
const Usuarios = require('../models/Usuarios');
const crypto=require('crypto');

exports.autenticarUsuario=passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage:'Ambos campos son obligatorios'
});

// log or not

exports.usuarioAutenticado=(req,res,next)=>{
    // si est auth
    if(req.isAuthenticated()){
        return next();
    }
    // no esta auth
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}
exports.enviarToken=async(req,res,next)=>{
    // uuser?
    const{email}=req.body;
    const usuario=await Usuarios.findOne({where:{email}})

    // no hay user
    if(!usuario){
        req.flash('error','no existe esta cuenta')
        res.redirect('/reestablecer');
    }

    // user exist
    // token
    usuario.token=crypto.randomBytes(20).toString('hex');
    // expire
    usuario.expiracion=Date.now()+3600000;
    // console.log(expiracion);

    // save en la  DB
    await usuario.save();

    // url reser
    const resetUrl=`https://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);
}

exports.resetPassword=async(req,res)=>{
    const usuario=await Usuarios.findOne({
        where:{
            token:req.params.token
        }
    })
    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/reestablecer')
    }
    // Form para generar el pass
    res.render('resetPassword',{
        nombrePagina:'Reestablecer Contraseña'
    })
}