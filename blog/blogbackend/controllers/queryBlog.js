const asyncHandler=require('express-async-handler');
const queryDB =require('../models/queryModel');
const blogsDB=require('../models/blogModel');

exports.queryAdd=asyncHandler(async(req,res)=>{
    if(!req.body.message){
        res.status(404);throw new Error("message is required");
    }
    const val=await blogsDB.findById(req.params.id);

    if(!val){
        res.status(404); throw new Error("Not found");
    }
    console.log("ok");
    const ff=await queryDB.create({
        user_id:req.user.id,
        blog_id:req.params.id,
        message:req.body.message
    });
    res.status(202).json(ff);
});
exports.deleteQuery=asyncHandler(async(req,res)=>{
    const val=await queryDB.findById(req.params.id);
    if(!val){
        res.status(404);throw new Error("Not found");
    }
    console.log(val);
    if(val.user_id.toString()!==req.user.id){
        res.status(404);throw new Error("Not found");
    }
    console.log("ok");
    await queryDB.findByIdAndDelete(req.params.id);
    res.status(202).json({message:"done"});
});