const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const qs = require('qs')

router.get('/getAll',(req,res)=>{
    var sql = `SELECT * FROM bok_article WHERE isDel != 1 `;
    pool.query(sql,(err,result)=>{
        res.send(result)
    })
})

router.post('/add',(req,res)=>{
    var sql = `INSERT INTO bok_article VALUES (NULL, ?, ?, ?,?, ?, ?, 0);`;
    var {title,content,likes,comment,data,upuser} = req.body
    pool.query(sql,[title,content,likes,comment,data,upuser],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'del err'})
    })
})

router.post('/del',(req,res)=>{
    var sql = `UPDATE bok_article SET isDel = 1 WHERE id = ?`;
    var id = req.body.id;
    pool.query(sql,[id],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'del success'}):res.send({'code':'404','msg':'del err'})
    })
})

router.post('/updata',(req,res)=>{
    var sql = `UPDATE bok_article SET title=?,content=? WHERE id = ?`;
    var {title,content,id} = req.query
    pool.query(sql,[title,content,id],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'del err'})
    })
})


module.exports = router