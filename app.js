const express = require('express')
const router = require('./routes/route')
const env = require('dotenv')
env.config() 
const app = express()

const port = process.env.port 

app.use(express.json()) 

app.use('/api',router)
app.listen(port,()=>{
    console.log("server is started ....!",port)
})



