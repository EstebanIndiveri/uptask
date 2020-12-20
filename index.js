const express=require('express');
const routes=require('./routes');
const path=require('path');
const bodyParser=require('body-parser');
const utils=require('./utils/index');
const flash=require('connect-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const passport=require('./config/passport');
// conexión db
const db=require('./config/db');

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');


db.sync().then(()=>console.log('Conectado al server localhost:3000')).catch(error=>console.log(error));

//app express
const app = express();

//static files
app.use(express.static('public'));

//Pug
app.set('view engine','pug');

//bodyparser
app.use(bodyParser.urlencoded({extended:true}))


//vistas
app.set('views',path.join(__dirname,'./views'));

//flahsmsj
app.use(flash());

app.use(cookieParser());

//sessions
app.use(session({
    secret:'supersecret',
    resave:false,
    saveUninitialized:false
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

//var dump a app
app.use((req,res,next)=>{
    // const fecha=new Date();
    // res.locals.year=fecha.getFullYear();
    res.locals.vardump=utils.vardump;
    res.locals.mensajes=req.flash();
    res.locals.usuario={...req.user}||null;
    // console.log(res.locals.usuario);
    next();
});

//routes
app.use('/',routes());

app.listen(3000);