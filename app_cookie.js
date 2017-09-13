const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get('/count',function(req,res){
	let count
	if(req.cookies.count){
		count = parseInt(req.cookies.count)
	} else {
		count = 0
	}
	count +=1
	res.cookie('count',count)
	res.send('count : '+count)
})

app.listen(3003,function(){
	console.log('3003 connected')
})