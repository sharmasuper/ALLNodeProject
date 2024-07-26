const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20").Strategy 

const dotenv = require('dotenv')
const { User } = require('../model/db')
dotenv.config()

passport.use(new GoogleStrategy({
  clientID : process.env.clientID,
  clientSecret : process.env.clientSecret,
  callbackURL : // "http://localhost:3000/auth/google/redirect" 
}, async function (accessToken,refreshToken,profile,done){
    // console.log("show profile ",profile)
   
    const find_Data =  await User.findOne({googleId:profile.id})
      if(!find_Data){
        const new_Data = await User.create({
            googleId : profile.id,
            username : profile.displayName,
            email : profile.emails[0].value,
            thumnail : profile._json.picture 
         }) 
         done(null,new_Data)
      }else{
        done(null,find_Data)
      }    
}))


passport.serializeUser( function (user,done){
 // console.log("serialize User ",user)
  done(null,user._id)
})

passport.deserializeUser(async function(id,done){
 // console.log("desrilize user",id)
  const find_data = await User.findById(id) 
 // console.log("find deserilize User",find_data) 
  done(null,find_data) 
}) 









