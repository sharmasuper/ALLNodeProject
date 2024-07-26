const express = require('express');
const { router } = require('./routes/auth_Routes');
const passport_setup = require("./config/passport_setup.js")
const mongoose = require('mongoose') 
const session = require("express-session")
const passport = require('passport')
const app = express()
const dotenv = require('dotenv');
const { ProfileRoute } = require('./routes/profile-routes.js');
dotenv.config()
//mongoose connection set 
mongoose.connect(process.env.Str)
.then(()=>{
    console.log("mongoose connected successfully")
})
.catch((error)=>{
    console.log("show mongoose error ",error)
})


//middleware 
app.set('view engine','ejs')

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24*60*60*1000, // 1 minute
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        sameSite: 'strict'
      } // Should be true in production if using HTTPS
}))

//initilize user 

app.use(passport.initialize())
app.use(passport.session())  //when express-session are difined up 

const auth_Check = (req,res,next) =>{  //these method is correct
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect("/auth/login")
    }
}

app.get("/",auth_Check,(req,res)=>{
    res.render("home",{user : req.user})
})

app.use("/auth",router)
app.use("/Profile",ProfileRoute) 
app.listen(3000,()=>{
    console.log("api listen on port "+ 3000)
})


