//inbuilde node package for create token
const crypto=require('crypto');
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    image:{
        type:String
    },
    resetToken:String,
    resetDate:Date,
    resetTokenExpire:Date
});
userSchema.methods.createResetToken=function(){
    //create a random token
    const token=crypto.randomBytes(32).toString('hex');
    //then hash it and put in the document
    this.resetToken=crypto.createHash('sha256').update(token).digest('hex');
    this.resetTokenExpire=Date.now()+(60*10*1000);
    this.save();
    console.log("fuck",this.resetToken);
    //then simply return it
    return token;  
};
module.exports=mongoose.model("userDB",userSchema);