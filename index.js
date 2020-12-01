const express=require('express');
const routes=require('./routes');
const path=require('path');
const bodyParser=require('body-parser');
const utils=require('./utils/index');
// conexión db
const db=require('./config/db');

require('./models/Proyectos');

require('./models/Tareas');


db.sync().then(()=>console.log('Conectado al server localhost:3000')).catch(error=>console.log(error));

//app express
const app = express();

//Pug
app.set('view engine','pug');

//static files
app.use(express.static('public'));

//vistas
app.set('views',path.join(__dirname,'./views'));

//var dump a app
app.use((req,res,next)=>{
    // const fecha=new Date();
    // res.locals.year=fecha.getFullYear();
    res.locals.vardump=utils.vardump;
    next();
});

//bodyparser
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use('/',routes());

app.listen(3000);