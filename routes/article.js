const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const qs = require('qs')

router.get('/getAll',(req,res)=>{
    var sql = `SELECT a.id,a.title,a.likes,a.comment,a.data,a.upuser,b.vip,b.userIco FROM bok_article a,bok_user b WHERE a.upuser = b.username AND a.isDel!=1`;
    pool.query(sql,(err,result)=>{
        res.send(result)
    })
})

router.post('/add',(req,res)=>{
    var sql = `INSERT INTO bok_article VALUES (NULL, ?, ?, ?,0,?, ?, ?, 0);`;
    var {title,content,likes,comment,data,upuser} = req.body
    pool.query(sql,[title,content,likes,comment,data,upuser],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'del err'})
    })
})

router.get('/del',(req,res)=>{
    var sql = `UPDATE bok_article SET isDel = 1 WHERE id = ?`;
    var id = req.query.id;
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

router.get('/getarticle',(req,res)=>{
    var ID = req.query.id 
    var obj = {}
    var p = new Promise(function(open){
        var sql = `Select * From bok_article Where id=?`
        pool.query(sql,[ID],(err,result)=>{
            result.isDel!=1 ? obj['msg']=result[0]:res.send({'code':'404','msg':"error"}) 
            open(result[0].upuser)
        })
    })
    .then(function(msg){
        var sql = `SELECT username,vip,userIco FROM bok_user WHERE username = ?`
        pool.query(sql,[msg],(err,result)=>{
            obj['user']=result[0]
        })
    })
    .then(function(){
        var sql = `SELECT a.cid,a.id,a.uid,a.date,a.content FROM bok_comment a WHERE a.id=?`
        pool.query(sql,[ID],(err,result)=>{
            obj['comment']=result
            res.send(obj)
        })
    })
 })



module.exports = router