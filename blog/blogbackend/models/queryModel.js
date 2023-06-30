const mongoose=require("mongoose");
const querySchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDB',
        required:true
    },
    blog_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogDB',
        required:true
    },
    message:String,
    createdAt:{type:Date,default:Date.now()}
});
querySchema.pre('save',function(next){
    this.populate('user_id');
    next();
});
module.exports=mongoose.model("queryDB",querySchema)