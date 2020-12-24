const { Sequelize } = require('sequelize');

const db=new Sequelize('wnemUL4F4w','wnemUL4F4w','uXVJYhAN81',{
    host:'remotemysql.com',
    dialect:'mysql',
    port:'3306',
    operatorsAliases:1,
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

module.exports=db;




// const { Sequelize } = require('sequelize');

// const db=new Sequelize('uptasknode','user','admin',{
//     host:'localhost',
//     dialect:'mysql',
//     port:'3306',
//     operatorsAliases:1,
//     define:{
//         timestamps:false
//     },
//     pool:{
//         max:5,
//         min:0,
//         acquire:30000,
//         idle:10000
//     }
// });

// module.exports=db;
