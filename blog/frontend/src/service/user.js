import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const baseUrl='http://localhost:5002/blog';
export const userApi=createApi({
    reducerPath:'user',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints(builder){
        return {
            loginUser:builder.mutation({
                query:(user)=>{
                    return{
                        url:'/login',
                        method:'post',
                        body:{
                            email:user.email,
                            password:user.password
                        },credentials: "include"
                    }
                }
            }),
            register:builder.mutation({
                query:(user)=>{
                    return {
                        url:'/register',
                        method:'post',
                        body:user
                    }
                }
            }),
            Password:builder.mutation({
                query:(email)=>{
                    return {
                        url:'/forgotPassword',
                        method:'POST',
                        body:{
                            email:email
                        }
                    }
                }
            }),
            reset:builder.mutation({
                query:(ok)=>{
                    return {
                        url:`/resetPassword/${ok.token}`,
                        method:'put',
                        body:{
                            password:ok.password
                        }
                    }
                }
            }),
            loggedIn:builder.query({
                query:()=>{
                    return {
                        url:'/loggedIn',
                        credentials: "include"
                    }
                }
            }),
            logOut:builder.query({
                query:()=>{
                    return {
                        url:'/logout',
                        credentials: "include"
                    }
                }
            })
        }
    }
});
export const {useLogOutQuery,useLoggedInQuery,useLoginUserMutation,usePasswordMutation,useResetMutation,useRegisterMutation}=userApi;