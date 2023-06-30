const mongoose=require("mongoose");
const connectDb=async()=>{
    mongoose.connect(process.CONECTION,{
        useNewUrlParser:true,
    }).then((res)=>{console.log("connected ")})
};
module.exports=connectDb