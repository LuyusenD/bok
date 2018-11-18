const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const qs = require('qs')

router.post('/add',(req,res)=>{
    var sql = `INSERT INTO bok_comment VALUES (NULL, ?, ?, ?, ?);`
    var data = new Date().toLocaleString();
    var {id,uid,content} = req.body;
    pool.query(sql,[id,uid,data,content],(err,result)=>{
        result.length>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'add error'})
    })
})






module.exports = router