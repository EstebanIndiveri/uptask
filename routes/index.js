const express=require('express');

const router=express.Router();

//routes:


module.exports=function(){
    router.get('/',(req,res)=>{
        res.send('Index');
    });
    router.get('/nosotros',(req,res)=>{
        res.send('Nosotros');
    });
    return router;
}
