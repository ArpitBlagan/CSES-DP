const express=require('express');
const dotenv=require('dotenv').config();
const connectDb=require('./config/dbConnectino');
const cors=require('cors');
const xss=require('xss-clean');const cookieParser = require('cookie-parser');
const  mongoSanitize=require('express-mongo-sanitize');
const helmet=require('helmet');
const rateLimit=require('express-rate-limit');
const app=express();
const port=process.env.PORT;
const router=require('./Routes/user');
const { errorHandler } = require('./middlwares/errorHandler');
const { default: mongoose } = require('mongoose');
//connectDb(); another way of connecting db
mongoose.connect(process.env.CONNECTION,{
    useNewUrlParser: "true",
}).then(con=>{console.log("connnected")});
//Global middleware
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
const limiter=rateLimit({
    max:100,
    //only 100 request from same ip in one hour
    windowMs:60*60*1000,
    message:"Too many request please try again after an hour..."
});
app.use('/blog',limiter);
app.use(cookieParser());
//allow two origin to share resource smoothly..
//app.use(cors());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
}));
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
//Body parse..
app.use(express.json());
app.use('/blog',router);
app.use(errorHandler);  
app.listen(port,()=>{
    console.log(`server listening on ${port}`);
})