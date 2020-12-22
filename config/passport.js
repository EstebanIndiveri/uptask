const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

// referencia al modelo auth

const Usuarios=require('../models/Usuarios');

// local strategy - login con credenciales propios
passport.use(
    new LocalStrategy(
        // Default pasport espera user y pass
        {
            usernameField:'email',
            passwordField:'password'
        },
        async (email,password,done)=>{
            try{
                const usuario=await Usuarios.findOne({
                    where:{
                        email,
                        activo:1
                    }
                });
                // pass incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message:'Contraseña incorrecta'
                    })
                }
                // email correcto
                return done(null,usuario)
            }catch(error){
                console.log(error);
                // no hay usuarioi
                return done(null,false,{
                    message:'Esa cuenta no existe'
                })
            }
        }
    )
);

// serializar user
passport.serializeUser((usuario,callback)=>{
    callback(null,usuario);
})
// deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
})
//export
module.exports=passport;