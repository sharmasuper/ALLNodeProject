const ProfileRoute = require('express').Router()

//auth_Check secure use 
// const auth_Check = (req,res,next) =>{  //these method is correct
//     if(req.isAuthenticated()){
//         next()
//     }else{
//         res.redirect("/auth/login")
//     }
// }
const auth_Check = (req,res,next) =>{
    if(!req.user){
        res.redirect("/auth/login")
        return
    }else{
        next()
    }
}


ProfileRoute.get("/",auth_Check,(req,res)=>{
   res.render("profile",{user:req.user})
})

module.exports = {ProfileRoute}






