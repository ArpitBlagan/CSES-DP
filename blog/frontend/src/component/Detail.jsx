import {useContext, useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useAddQueryMutation,useDeleteQueryMutation } from '../service/query';
import { AuthContext } from '../context/Logged';
import { useDeleteBlogMutation } from '../service/blogs';
import { useGetBlogQuery } from '../service/blogs';
import { useParams,useNavigate  } from 'react-router-dom';
import Cookie from 'js-cookie';
const Detail = () => {
    const [deleteQuery,fuck]=useDeleteQueryMutation();
    const navigate=useNavigate();
    const {id}=useParams();
    const {data,isFetching}=useGetBlogQuery({id});
    const val=Cookie.get('id');
    const ff=val.substring(3);
    const fff=ff.slice(0,-1);
    const {ok,check}=useContext(AuthContext);
    const [deleteBlog,okkk]=useDeleteBlogMutation();
    const [addQuery,ook]=useAddQueryMutation();
    const [message,setM]=useState("");
    console.log(".",data,isFetching);
    if(isFetching){return <div>Loading</div>}
  return (<div className='text-white'>
    <div className='flex  justify-center  mt-6'>
    <div>
    <div className='bg-gray-700 p-20 text-center'>
        <div className='object-fill'>
                {data?.data.title}
        </div>
        <div className='break-words w-screen whitespace-pre-line'>
            {data?.data.description}
        </div>
        <div>
            {data?.data.createdAt}
        </div>
    </div>  
    {(ok&&data?.data?.user_id.toString()==fff.toString())?<div className='flex bg-gray-700 justify-around'>
        <div><button className='p-1 rounded bg-blue-600 hover:bg-blue-800'
            onClick={(e)=>{
                e.preventDefault();
                navigate("/post",{state:{title:data?.data?.title,description:data?.data?.description,id:data.data.id}})
            }}
        >update</button></div>
        <div><button className='p-1 rounded bg-blue-600 hover:bg-blue-800'
            onClick={async(e)=>{
                e.preventDefault(); 
                try{const daa=await deleteBlog(data?.data.id).unwrap();navigate("/");}
                catch(err){alert("something went please try again later");}
            }}
        >Delete</button></div>
    </div>:""}
    </div>
    </div>
    <div className='h-screen bg-gray-600 mt-10 text-center'>
        {ok?<div>
            AddComment
            <div className='flex justify-center m-2'>
                <input className='rounded p-2 h-15  mr-3 text-black'
                     placeholder='enter comment..'
                    value={message}
                    onChange={(e)=>{setM(e.target.value)}}
                 />
                <button 
                    className='rounded bg-blue-600 hover:bg-blue-800 p-3'
                    onClick={async(e)=>{
                        e.preventDefault();
                        try{
                            console.log(data.data.id);
                            const dat=await addQuery({id:data.data.id,message:message}).unwrap();
                            alert("you comment is added");
                            console.log(dat);setM("");
                            window.location.reload();
                        }catch(err){console.log(err);alert("try again");}
                    }}
                >Add</button>
            </div>
        </div>:""}
        <div className='p-2 m-3'>Comments</div>
        <div className='pl-20 grid grid-cols-3 gap-5  bg-black'>
                {data?.data?.queries.map((ele,index)=>(
                    <div key={index} className=' flex'>
                        <div>
                        <div>*{ele.message}</div>
                        <div>{ele.createdAt}</div>
                        <div>{ele.user_id.name}</div>
                        </div>
                        {fff.toString()===ele.user_id._id?
                            <div>
                                <button className='p-2 ml-5 bg-blue-600 hover:bg-blue-800 rounded'
                                    onClick={async(e)=>{
                                        e.preventDefault();
                                        try{
                                            const data=await deleteQuery({id:ele._id}).unwrap();
                                            alert("deleted");
                                            window.location.reload();
                                        }catch(err){console.log(err);}
                                    }}
                                >
                                Delete
                                </button>
                            </div>
                        :""}
                    </div>
                ))}
        </div>
    </div>
    </div>
  )
}

export default Detail