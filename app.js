const express = require('express')
const session = require('express-session')
const passport = require('passport')
const GoogleStrtegy = require('passport-google-oauth20').Strategy
const path = require("path")
const dotenv = require('dotenv')

const app = express()
dotenv.config()
//Middleware 
app.set('view engine','ejs')
app.use(session({
    secret : "Key",
    resave : false,
    saveUninitialized : false,
    cookie : {secure : false}

}))

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Should be true in production if using HTTPS

}))

app.use(passport.initialize())
app.use(passport.session())  //when express-session are difined up 

passport.use(new GoogleStrtegy({
    clientID : process.env.clientID,
    clientSecret : process.env.clientSecret,
    callbackURL :// "http://localhost:3000/auth/google/callback"  hiddlen mohit sharma
},function(acessToken,refreshToken,profile,cb){
    cb(null,profile)
}))

passport.serializeUser(function (user,cb){
    cb(null,user)
})

passport.deserializeUser(function(obj,cb){
    cb(null,obj)
}) 

app.use(express.static('public')) 

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/dashboard",(req,res)=>{
    if(req.isAuthenticated()){
        res.render("dashboard",{user : req.user})
    }else{
        res.redirect("/login")
    }
})

app.get("/auth/google",passport.authenticate('google',
    {scope : ["Profile","email"]})) 

app.get("/auth/google/callback",passport.authenticate('google',{
    failureRedirect : "/login"
}),(req,res)=>{res.redirect('/dashboard')})

app.get("/logout",(req,res)=>{
    req.logout(function(err){
        if(err){
            console.log("show logout err",err)
        }else{
            res.redirect('/login')
        }})})

app.listen(3000,()=>{
    console.log("api listen on port "+ 3000)
})
