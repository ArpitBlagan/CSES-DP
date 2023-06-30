import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl='http://localhost:5002/blog/query'
export const queryApi=createApi({
    reducerPath:'query',
    baseQuery:fetchBaseQuery({baseUrl}),
    endpoints(builder){
        return {
            addQuery:builder.mutation({
                query:(val)=>{
                    return{
                        url:`/${val.id}`,
                        method:'post',
                        body:{
                            message:val.message
                        },
                        credentials:"include"
                    }
                }
            }),
            deleteQuery:builder.mutation({
                query:(val)=>{
                    return {
                        url:`/${val.id}`,
                        method:'delete',
                        credentials:'include'
                    }
                }
            })
        }
    }
});
export const {useAddQueryMutation,useDeleteQueryMutation}=queryApi;