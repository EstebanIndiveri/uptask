const express=require('express');
const routes=require('./routes');
const path=require('path');
const bodyParser=require('body-parser');

// conexión db
const db=require('./config/db');

require('./models/Proyectos');

db.sync().then(()=>console.log('Conectado al server')).catch(error=>console.log(error));

//app express
const app = express();

//Pug
app.set('view engine','pug');

//static files
app.use(express.static('public'));

//vistas
app.set('views',path.join(__dirname,'./views'));

//bodyparser
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use('/',routes());

app.listen(3000);