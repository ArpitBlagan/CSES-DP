const jwt=require("jsonwebtoken");
const express=require('express');
const { getUserBlogs,registerUser,loginUser, forgotPassword, resetPassword,logOut} =require('../controllers/userController');
const {getAllBlogs,addBlog, deleteBlog, updateBlog, getBlog}=require('../controllers/getAllBlogs');
const {validateToken}=require('../middlwares/validateJWT');
const { queryAdd, deleteQuery } = require('../controllers/queryBlog');
const router=express.Router();
router.route('/register').post(registerUser);
router.route('/').get(getAllBlogs);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/logout').get(logOut);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').put(resetPassword);
router.route('/loggedIn').get((req,res,next)=>{
    const token=req.cookies.jwt;
        console.log("jwt",token);
        if(!token){res.send(false);return;}
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.send(false);return ;
            }else{
            res.send(true);return ;
            }});
        
});
router.use(validateToken);
router.route('/app').post(addBlog);
router.route('/app/:id').delete(deleteBlog).put(updateBlog).get(getBlog);
//for get the query we need blog id and for delete send the query id 
router.route('/query/:id').post(queryAdd).delete(deleteQuery);
module.exports=router;