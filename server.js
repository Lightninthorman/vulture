//===============
//Dependencies
//===============
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const session = require('express-session')
require('dotenv').config()

//==============
//PORT
//==============
const PORT = process.env.PORT
// console.log(PORT);

//==============
//Database
//==============
const MONGODB_URI = process.env.MONGODB_URI
// console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//==============
//Middleware
//==============
//use public folder for static asssets
app.use(express.static('public'))

//populate req.body with parsed info from forms
app.use(express.urlencoded({extended:false}))

//be able to use delete and put routes
app.use(methodOverride('_method'))

//set session cookie
app.use(session({
    secret:"hihermano",//random string
    resave:false,
    saveUninitialized:false
}))
//==============
//Routes
//==============
//== /dashboard route
const dashController = require('./controllers/dashboard.js')
app.use('/dashboard', dashController)

//== /user route
const userController = require('./controllers/users.js')
app.use('/user', userController)

//== /session routes
const sessionController = require('./controllers/session.js')
app.use('/session', sessionController)


app.get('/', (req,res) => {
    res.render('home.ejs', {
        tabTitle: 'Vulture | Log In/Sign Up'
    })
})
//==============
//Listeners
//==============
app.listen(PORT, () => {
    console.log('listening on port: ',PORT);
})
