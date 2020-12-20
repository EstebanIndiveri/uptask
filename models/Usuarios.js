const Sequelize=require('sequelize');
const db=require('../config/db');
const bcrypt=require('bcrypt-nodejs');
const Proyectos=require('../models/Proyectos');

const Usuarios=db.define('usuarios',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:Sequelize.STRING(60),
        allowNull:false,
        validate:{
            isEmail:{
                msg:'Agregar un correo válido'
            },
            notEmpty:{
                msg:'El Email no puede estar vacio'
            }
        },
        unique:{
            message: 'Username must be unique.',
            fields: [Sequelize.fn('lower', Sequelize.col('username'))]
        }
    },
    password:{
        type:Sequelize.STRING(60),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'La contraseña no puede estar vacia'
            }
        }
    }
},{
    hooks:{
        beforeCreate(usuario){
           usuario.password=bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10));
        }
    }
})
// //Metódo person
Usuarios.prototype.verificarPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

// Usuarios.hasMany(Proyectos);
module.exports=Usuarios;
