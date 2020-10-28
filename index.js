const express=require('express');
const routes=require('./routes');
const path=require('path');
//app express
const app = express();

//Pug
app.set('view engine','pug');

//static files
app.use(express.static('public'));

//vistas
app.set('views',path.join(__dirname,'./views'));

//routes
app.use('/',routes());

app.listen(3000);