const mongoose=require("mongoose");
const blogSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userDB'
    },
    title:{
        type:String,
        required:[true,"title is required"],
        minlength:[5,"title length should be greater than five"],
        maxLength:[40,"title length should be less then 40"]
    },
    description:{
        type:String,
        required:[true,"description is required"],
        maxLength:1000
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
},{
    //for using virtual function ..
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
//virtual population function used to calculate the field from the given field in schema
//which are not actually store in the db.
blogSchema.virtual('queries',{
    ref:'queryDB',
    foreignField:'blog_id',
    localField:'_id'
});
//so this the populate function which is used to populate the user_id field with actual
//user document which matches the id and send the response for all query starting with find.
// blogSchema.pre('find',function(next){
//     this.populate('user_id');next();
// })
module.exports=mongoose.model("blogsDB",blogSchema);
