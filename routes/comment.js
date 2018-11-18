const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const qs = require('qs')

router.post('/add',(req,res)=>{
    var sql = `INSERT INTO bok_comment VALUES (NULL, ?, ?, ?, ?);`
    var data = new Date().toLocaleString();
    var {id,uid,content} = req.body;
		if(content =='' || content == null || uid ==null || id==null){
					res.send({'code':'404','msg':'add error'})
            		return;
	}
	var p = new Promise(function(open){
		var sql = `SELECT comment FROM bok_article WHERE id = ?`;
		pool.query(sql,[id],(err,result)=>{
			open(result[0].comment)
		})
	})
	.then(function(msg){
		msg = parseInt(msg)+1
		var sql = `UPDATE bok_article SET comment = ? WHERE id = ?`;
		pool.query(sql,[msg,id],(err,result)=>{

		})
	})
	.then(function(){
		pool.query(sql,[id,uid,data,content],(err,result)=>{
        result.affectedRows>0?res.send({'code':'200','msg':'add success'}):res.send({'code':'404','msg':'add error'})
        })	
	})

})







module.exports = router