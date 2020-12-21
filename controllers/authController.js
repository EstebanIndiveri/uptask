const passport=require('passport');
const Usuarios = require('../models/Usuarios');
const crypto=require('crypto');
const Sequelize=require('sequelize');
const bcrypt=require('bcrypt-nodejs');
const Op =Sequelize.Op; 
const main=require('../handler/email');

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
    const resetUrl=`http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);

    // Envia correo
    await main({
        usuario,
        subject:'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });
    req.flash('correcto','Se envió un mensaje a tu correo');
    res.redirect('/iniciar-sesion')
}

exports.validarToken=async(req,res)=>{
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

exports.actualizarPassword=async(req,res,next)=>{
    // console.log(req.params.token);
    // verifica token y expiraciòn
    const usuario=await Usuarios.findOne({
        where:{
            token:req.params.token,
            expiracion:{
                [Op.gte]:Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }

    // hash pass 
    usuario.password=bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10));
    usuario.token=null;
    usuario.expiracion=null;

    await usuario.save();
    req.flash('correcto','Tu contraseña se ha modificado correctamente')
    res.redirect('/iniciar-sesion');

}