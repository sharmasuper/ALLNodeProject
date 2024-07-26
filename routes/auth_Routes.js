const router = require('express').Router()
const passport = require('passport')

//auth login
router.get("/login",(req,res)=>{
       res.render('login',{user : req.user})
})

router.get("/logout",(req,res)=>{
    //handle with passport
    req.logout(function(err){
        if(!err){
            res.redirect("/auth/login")
        }else{
            console.log("show logout err ",err)
        }
    })
    
})


router.get("/google",passport.authenticate("google",
    {scope : ["Profile","email"]}))

    
router.get("/google/redirect",passport.authenticate('google',{
    failureRedirect : '/login'
}),(req,res)=>{res.redirect("/Profile/")})



module.exports = {router}
