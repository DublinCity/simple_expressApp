const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('view engine','jade')
app.set('views','./templates')
app.get('/',function(req,res){
	res.send('hello worddld')
})
app.get('/temp',function(req,res){
	res.render('index')
})
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Expddress</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
})

app.listen(3000,function(){
	console.log('app is working at 3000 port')
})

