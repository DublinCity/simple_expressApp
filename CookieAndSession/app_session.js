const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var session = require('express-session'),
    OrientoStore = require('connect-oriento')(session);


app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
	secret: '12345678',
	resave: false,
	saveUninitialized: true,
	store: new OrientoStore({
            server: "host=localhost&port=2424&username=root&password=white7546&db=express"
        })
}))

	const user =[{
		id:'koo',
		password:'123',
		name:'dublincity'
	}]

app.get('/count',function(req,res){
	res.send('hi sessigon')
})

app.get('/auth/login',function(req,res){
	let output= ''
	output += `
		<h1>Login</h1>
		<form action='/auth/login', method='post'>
		<p>
		<input type="text", name="id", placeholder='Login_ID'>
		</p>
		<p>
		<input type="password", name="password", placeholder='password>'
		</p>
		<p>
		<input type="submit", value="submit">
		<button><a href="/auth/register" style="text-decoration:none; color:black;">Register</a></button>
		</p>
		</form>
	`
	console.log(user)
	res.send(output)
})

app.get('/auth/logout',function(req,res){
	delete req.session.name
	res.redirect('/auth/login')
})
app.post('/auth/login',function(req,res){
	let selectedUser = user.find(elem=>{return elem.id===req.body.id})
	if(req.body.id === selectedUser.id && req.body.password === selectedUser.password){
		req.session.name = selectedUser.name
		console.log(req.session)
		res.redirect('/welcome')
	} else{
	res.send('not found <p><a href="/auth/login">Login please </a></P')
	}
})

app.get('/auth/register',function(req,res){
	let output=''
	output += `
		<h1>Register New User</h1>
		<form action='/auth/register', method='post'>
		<p>
		<input type="text", name="id", placeholder='Login_ID'>
		</p>
		<p>
		<input type="password", name="password", placeholder='password>'
		</p>
		<p>
		<input type="text" name="name" placeholder="NickName">
		</p>
		<p>
		<input type="submit", value="register">
		<button><a href="/auth/login" style="text-decoration:none; color:black;">cancel</a></button>
		</p>
		</form>
	`
	res.send(output)
})

app.post('/auth/register',function(req,res){
	let id = req.body.id
	let password= req.body.password
	let name= req.body.name
	if(id&&password&&name){
		user.push({
			id:id,
			password:password,
			name:name
		})
		console.log(user[1])
		res.redirect('/auth/login')
	} else {
		res.redirect('/auth/register')
	}
})

app.get('/welcome',function(req,res){
	if(req.session.name){
		res.send(`
			<h1>Hello, ${req.session.name}</h1>
			<a href="/auth/logout">logout</a>
		`)
	} else {
		res.send(`
			<h1>welcome</h1>
			<a href="/auth/login">Login</a>
		`)
	}
})

app.listen(3003,function(){
	console.log('connected')
})

