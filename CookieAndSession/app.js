const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser('asdf'))

let products ={
	1:{title:'the history of web'},
	2:{title:'onthedesk of internet'},
}

/*
	cart format
	cart = {
		id:num,
		1:2,
		2:1,
		...
	}
*/

app.get('/products',function(req,res){
	let output =''
	for(prop in products){
		output +=`<li>
									<a href="/cart/${prop}">${products[prop].title}</a>
							</li>`
		console.log(products[prop].title)
		console.log(typeof(prop))
	}
	res.send('<h1>Product</h1>'+output+'<a href="/cart">cart</a>')
})

app.get('/cart',function(req,res){
	let cart = req.signedCookies.cart
	if(!cart){
		res.send('empty')
	} else {
		let output =''
		for(let prop in cart){
			output+= `<li>${products[prop].title}(${cart[prop]})</li>`
	}
	res.send(`<h1>CART</h1><ul>${output}</ul><a href="/products">next</a>`)
	}
})

app.get('/cart/:id',function(req,res){
	let id = req.params.id
	//typeof?
	let cart = {}
	if(req.signedCookies.cart){
		cart = req.signedCookies.cart
	}
	console.log('11',typeof(id))
	if(id===undefined){
		res.send(cart)
	}
	if(!cart[id]){
		cart[id]=0
		console.log('hit')
	}
	cart[id]= parseInt(cart[id])+1
	res.cookie('cart',cart,{signed:true})
	res.redirect('/cart')
})
app.listen(3003,function(){
	console.log('3003 listen')
})
























