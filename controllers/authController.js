const passport=require('passport');



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