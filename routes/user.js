const express = require('express');
const router = express.Router();
const pool = require('../pool.js');

router.post('/login',(req,res)=>{
    var sql = `SELECT * FROM bok_user WHERE username = ? AND password = ?`;
    var {uname,upwd} = req.body
    pool.query(sql,[uname,upwd],(err,result)=>{
        result!=undefined?res.send({'code':'200','msg':'login success'}):res.send({'code':'404','msg':'login err'})
    })
    
})

module.exports=router