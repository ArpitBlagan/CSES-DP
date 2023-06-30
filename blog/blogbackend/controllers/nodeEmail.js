const nodemailer=require('nodemailer');
const sendMail=async(op)=>{
    //create a account
    let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: 'arpit',
        pass: 'sahul@123'
    },
  });
    //sent the email
    const info=await transporter.sendMail({
        from:"Blogs <demo28052002@gmail.com>",
        to:`<${op.email}>`,
        subject:"Password reset",
        text:`http://localhost:5002/blog/resetPassword/:${op.id}`
    });console.log("sending..");
    console.log(info);
}
module.exports =sendMail;