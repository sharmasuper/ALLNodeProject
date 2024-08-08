const nodemailer = require('nodemailer');
const Mailgen = require('mailgen')
// send email from testing account 
const signup = async(req,res) =>{
  const testAccount = await nodemailer.createTestAccount();
  console.log("Test account:", testAccount.user, testAccount.pass); 
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", 
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: testAccount.user ,
      pass: testAccount.pass,
    },
  });

 let message = {
    from: "ms6375349671@gmail.com",
    to: "mohit6375sharma@gmail.com", // list of receivers 
    subject: "Hello ✔", // Subject line 
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
 }

 transporter.sendMail(message).then((info)=>{
    return res.status(201).json({
        msg : "you should recived an email",  
        info : info.messageId, 
        preview : nodemailer.getTestMessageUrl(info)
    }) 
 }).catch((error)=>{
    return res.status(500).json({msg : "error sending email",error :error.message}) 
 })


   
}
 
//send mail from real gmail account

const getbill = (req,res) => {
   const {userEmail} = req.body;
  console.log("userEmail is ",userEmail)

    let config = {
        service : 'gmail',
        auth : {
            user : process.env.Email,
            pass : process.env.password  
        }
    }
   let transporter = nodemailer.createTransport(config); 
   let Mailgenerator = new Mailgen({
     theme : "default",
     product : { 
       name : "My App",
       link : "http://mailgen.com"
     }
   })

    let response = {
      body : {
        name : "Daily question",
        intro : "Your bill has arrived !",
        table : {
          data : [
           { item : "NodeEmailer stack Book",
            description : "A Backend application",
            price : "$10.99"
           }
          ]
        },
        outro : "Looking forward to do more business"
      }
    }

    let mail = Mailgenerator.generate(response)
    let message = {
      from : process.env.Email,
      to :userEmail, 
      subject : "Place order",
      html : mail 
     
    }
   
    transporter.sendMail(message).then((data)=>{
      return  res.status(201).json({
        msg : "you should recive an email",
      })
    }).catch((error)=>{
      return res.status(500).json({error:error.message})
    })
}

module.exports = {signup,getbill} 