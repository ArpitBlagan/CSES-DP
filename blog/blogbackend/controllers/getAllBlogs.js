const asycnHandler=require('express-async-handler');
const blogsDB =require('../models/blogModel');
const queryDB=require('../models/queryModel')
exports.getAllBlogs= asycnHandler(async(req,res)=>{
    const data=await blogsDB.find()
    res.status(200).json({
        data
    });
});
exports.addBlog=asycnHandler(async(req,res)=>{
    const {
        title,description
    }=req.body;
    if(!title,!description){
        res.status(404);throw new Error("all fileds required");
    }
    const val=await blogsDB.create({
        user_id:req.user.id,
        title:title,
        description:description,
        createdAt:Date.now()
    });
    if(val){
        res.status(202).json({
            val
        });
    }
    else{res.status(400);throw new Error("Can't add you blogs");}
});
exports.deleteBlog=asycnHandler(async(req,res)=>{
    const val=await blogsDB.findById(req.params.id);
    console.log("fuck",val);
    if(!val){
        res.status(404);throw new Error("Blog not found");
    }
    console.log("okok deletee",req.user.id,val.user_id);
    if(val.user_id.toString()!==req.user.id){
        res.status(404);throw new Error("You can't delete this as you are not the one who posted it sorry..");
    }console.log("ok");
    const ss=await queryDB.deleteMany({blog_id:val._id});
    const kk=await blogsDB.findByIdAndDelete(val._id);
    if(!kk){
        res.status(404);throw new Error("something went wrong");
    }

    res.status(202).json({
        message:"Deleted"
    })
});
exports.updateBlog=asycnHandler(async(req,res)=>{
    const val=await blogsDB.findById(req.params.id);
    if(!val){
        res.status(404);throw new Error("Not found");
    }
    if(val.user_id.toString()!==req.user.id){
        res.status(404);throw new Error("Invalid access");
    }
    console.log("hitting");
    const ff=await blogsDB.findByIdAndUpdate(
        req.params.id,
        req.body,
    );
    if(!ff){res.status(404);throw new Error("fuck");}
    res.status(202).json(ff);
});
exports.getBlog=asycnHandler(async(req,res)=>{
    const ff=await blogsDB.findById(req.params.id);
    console.log(req.params.id);
    if(!ff){
        res.status(404);throw new Error("Not found")
    }
    //This is how we populate the populate field
    //simply first populate the queries field than in that field populate the user_id field.
    const data=await blogsDB.findById(req.params.id).populate({path:'queries',populate:{
        path:'user_id',ref:"userDB"
    }});
    res.status(200).json({
        data
    });
})