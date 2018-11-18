const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const qs = require('qs')

// 获取所有文章
router.get('/getAll',(req,res)=>{
    var sql = `SELECT a.id,a.title,a.likes,a.comment,a.data,a.upuser,b.vip,b.userIco FROM bok_article a,bok_user b WHERE a.upuser = b.username AND a.isDel!=1`;
    pool.query(sql,(err,result)=>{
        res.send(result)
    })
})
// 添加文章
router.post('/add',(req,res)=>{
    var sql = `INSERT INTO bok_article VALUES (NULL, ?, ?, ?,0,?, ?, ?, 0);`;
    var data = new Date().toLocaleString()
    var {title,content,upuser} = req.body
    var likes=0,comment=0
    pool.query(sql,[title,content,likes,comment,data,upuser],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'del err'})
    })
})
// 删除文章
router.get('/del',(req,res)=>{
    var sql = `UPDATE bok_article SET isDel = 1 WHERE id = ?`;
    var id = req.query.id;
    pool.query(sql,[id],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'del success'}):res.send({'code':'404','msg':'del err'})
    })
})
// 修改文章
router.post('/updata',(req,res)=>{
    var sql = `UPDATE bok_article SET title=?,content=? WHERE id = ?`;
    var {title,content,id} = req.body
    pool.query(sql,[title,content,id],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'del err'})
    })
})
// 获取文章详情
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
        var sql = `select a.cid,a.id,a.uid,a.date,a.content,b.username,b.userIco,b.vip from bok_comment a,bok_user b WHERE a.uid=b.uid AND a.id= ?`
        pool.query(sql,[ID],(err,result)=>{
            obj['comment']=result
            res.send(obj)
        })
    })
 })
// 浏览+1
router.post('/browseone',(req,res)=>{
    var ID = req.body.id;

    var p = new Promise(function(open){
        var sql = `Select browse From bok_article WHERE id=?`
        pool.query(sql,[ID],(err,result)=>{
            console.log(result[0].browse)
           open(result[0].browse)
        })
    })
    .then(function(msg){
        var sql = `UPDATE bok_article SET browse=? WHERE id=?`
        msg = parseInt(msg)+1;
        pool.query(sql,[msg,ID],(err,result)=>{
            
        })
    })
    
 })


module.exports = router