const express = require('express')
const app = express()
const fs = require('fs')

// 파일 전송을 위한 multer config
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
// 

// server configuration
const OrientDB = require('orientjs');

const server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'white7546'
});
const db = server.use('express')
// 

// POST 를 받기위한 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// 

// jade 를 보기위한 template engine 정의
app.set('views','./view_file')
app.set('view engine', 'jade')
// 

/////////// EXPRESS-ROUTER section
app.get('/topic/add',function(req,res){
	let sql='SELECT FROM topic'
	db.query(sql).then(function(topics){
		res.render('add',{topics: topics})
	})
})

app.post('/topic/add',function(req,res){
	const title = req.body.title
	const description = req.body.description
	const author = req.body.author
	let sql= "INSERT INTO topic (title,description,author) VALUES(:title,:description,:author)"
	db.query(sql,{
		params:{
			title:title,
			description:description,
			author:author
		}
	}).then(function(result){
		res.redirect('/topic/'+encodeURIComponent(result[0]['@rid']))	
	})

})

app.get('/topic/:id/edit',function(req,res){
	let sql='SELECT FROM topic'
	db.query(sql).then(function(topics){
		let id = req.params.id
		console.log(id)
		if(id){
			sql='SELECT FROM topic WHERE @rid=:rid'
			db.query(sql,{params:{rid:id}}).then(function(topic){
					console.log(topic)
					res.render('edit',{topics: topics,topic:topic[0]})
			})
		} 
	})
})

// app.post('topic/:id/edit',function(req,res){
// 	console.log('here')
// 	let sql='UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:id'
// 	db.query(sql,{params:{
// 		t:req.body.title,
// 		d:req.body.description,
// 		a:req.body.author,
// 		id:req.params.id,
// 	}}).then(function(topics){
// 		res.redirect('/topic/'+encodeURIComponent(req.params.id))	
// 	})
// })
app.post('/topic/:id/edit',function(req,res){
	console.log('here')
	let sql='UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:id'
	db.query(sql,{params:{
		t:req.body.title,
		d:req.body.description,
		a:req.body.author,
		id:req.params.id,
	}}).then(function(topics){
		res.redirect('/topic/'+encodeURIComponent(req.params.id))	
	})
})

app.get(['/topic','/topic/:id'],function(req,res){
	
	let sql='SELECT FROM topic'
	db.query(sql).then(function(topics){
		let id = req.params.id
		console.log(id)
		if(id){
			sql='SELECT FROM topic WHERE @rid=:rid'
			db.query(sql,{params:{rid:id}}).then(function(topic){
					console.log(topic)
					res.render('index',{topics: topics,topic:topic[0]})
		})
		} else {
			res.render('index',{topics: topics})
		}
	})
})	
	

	app.get('/upload',function(req,res){
		res.render('upload')
	})

	app.post('/upload',upload.single('userfile'),function(req,res){
		res.send('uploaded'+req.file)
	})
	

app.listen(3000,function(){
	console.log("connetec 3000 port")
})
