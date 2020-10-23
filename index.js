const express=require('express');
const routes=require('./routes');
//app express
const app = express();

//routes

app.use('/',routes());

app.listen(3000);