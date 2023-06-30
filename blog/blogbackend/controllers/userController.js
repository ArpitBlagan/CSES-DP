const asyncHandler=require('express-async-handler');
const userDB=require('../models/userModel');
const blogsDB=require('../models/blogModel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const { use } = require('../Routes/user');
const sendMail=require('./nodeEmail');
exports.getUserBlogs=asyncHandler(async(req,res)=>{
    const data=await blogsDB.find({user_id:req.user.id})
    res.status(200).json({
       data
    })
});
exports.registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password);
    if(!name||!email||!password){
        res.status(400);throw new Error("All fields require");
    }
    const val=await userDB.findOne({email});
    if(val){
        res.status(400);throw new Error("This email is already registered");
    }
    const hash=await bcrypt.hash(password,10);
    const data=await userDB.create({name,email,password:hash}   );
    if(data){
    res.status(200).json({data});}
    else{
        res.status(404);throw new Error("Something went wrong the fields");
    }
});
exports.logOut=asyncHandler(async(req,res)=>{
    res.cookie("jwt","",{
        expires:new Date(0),
        httpOnly:true
    });
    res.cookie("id","",{
        //30 days in milisecond
        path:"/",
        //httpOnly:true
    });
    console.log("remove the cookie");
    res.send("done");
});
exports.loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);throw new Error("All fields require");
    }
    const user=await userDB.findOne({email});
    console.log(user);
    if(user&&(await bcrypt.compare(password,user.password))){
        const token= jwt.sign({
            user:{
                id:user._id,
                email:user.email,
                name:user.name
            }
        },process.env.ACCESS_TOKEN,{expiresIn:"30m"});
        res.cookie("jwt",token,{
            //30 days in milisecond
            expires:new  Date(Date.now()+(30*24*60*60*1000)),
            httpOnly:true
        });
        //In id we are not making it httpOnly true because we have to access it in front end
        //using js cookie library if we use httpOnly:true it will not allow us to access it
        res.cookie("id",user._id,{
            //30 days in milisecond
            
        });
        // const cookie=`token=${jwt};`
        // res.setHeader("set-cookie",[cookie]);
        res.status(200).json({
            id:user._id
        });
    }
    else{
        res.status(404);throw new Error("Invalide email and password");
    }
});
exports.forgotPassword=asyncHandler(async(req,res)=>{
    const user=await userDB.findOne({email:req.body.email});
    if(!user){
        res.status(404);throw new Error("No user with given email");
    }
    console.log(req.body.email);
    //using mongoose methods
    const resetToken=user.createResetToken();
    //we set validator to email and password that we need them 
    //await userDB.save({validateBeforeSave:false});
    //sendMail({id:resetToken,email:user.email})
    res.status(202).json({"token":resetToken});
});
exports.resetPassword=asyncHandler(async(req,res)=>{
    //Get user based of this token and check that token is expired or not
    console.log("req",req.params)
    const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');;
    console.log("fuck",hashedToken);
    const user=await userDB.findOne({resetToken:hashedToken});
    console.log("okkkkk",user);

    if(!user){
        res.status(404);throw new Error("No Found");
    }
    //reset the Password
    const hash=await bcrypt.hash(req.body.password,10);
    console.log("hash",hash);
    user.password=hash;
    user.resetToken=undefined;
    user.resetTokenExpire=undefined;
    await user.save();
    res.status(200).json({
        id:user._id
    });
});