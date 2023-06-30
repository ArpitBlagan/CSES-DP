import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl="http://localhost:5002/blog"
export const blogsApi=createApi({
    reducerPath:"blog",
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints(builder){
        return {
            getBlogs:builder.query({
                query:()=>{
                    return{
                        url:'/',
                    }
                }
            }),
            getBlog:builder.query({
                query:(user)=>{
                    return {
                        url:`/app/${user.id}`,
                        credentials:"include"
                    }
                }
            }),
            deleteBlog:builder.mutation({
                query:(id)=>{
                    return{
                        url:`/app/${id}`,
                        method:'delete',
                        credentials:"include"
                    }
                }
            }),
            updateBlog:builder.mutation({
                query:(val)=>{
                    return{
                        url:`/app/${val.id}`,
                        method:'put',
                        body:val.body,
                        credentials:"include"
                    }
                }   
            }),
            addBlog:builder.mutation({
                query:(val)=>{
                    return{
                    url:'/app',
                    method:'post',
                    body:val,
                    credentials:"include"}
                }
            })
        }
    }
});
export const {useAddBlogMutation,useGetBlogQuery,useGetBlogsQuery,useDeleteBlogMutation,useUpdateBlogMutation}=blogsApi;