import {useState,useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUpdateBlogMutation,useAddBlogMutation } from '../service/blogs';
const Post = () => {
    const navigate=useNavigate();
    const [addBlog,kk]=useAddBlogMutation();
    const [updateBlog,fkd]=useUpdateBlogMutation();
    const [tit,setT]=useState("");
    const [des,setD]=useState("");
    const [check,setC]=useState("Add Post");
    const location=useLocation();
    useEffect(()=>{
        if(location?.state?.title&&location?.state?.description){
            const {title,description}=location.state;
            setT(title);setD(description);
            setC("Update Post")
        }
    },[]);
  return (
    <div className='h-screen flex flex-col justify-center align-middle bg-gray-700'>
        <div className='flex flex-col justify-center align-middle' >
            <div className='text-white bg-gray-900 pl-10 pr-10 pt-5 pb-5'>
                <div className='text-lg text-center font-bold'>{check}</div>
                <form>
                    <div>
                        <div className='font-semibold text-lg'>Title</div>
                        <input className='w-full rounded p-3 text-black' 
                            required placeholder="Enter the title" 
                            onChange={(e)=>{setT(e.target.value)}}
                            value={tit}
                        />
                    </div>
                    <div>
                    <div className='font-semibold text-lg'>Description</div>
                    <input required className='w-full rounded p-10 text-black' 
                        placeholder="Enter the title" 
                        onChange={(e)=>{setD(e.target.value)}}
                        value={des} 
                    />
                    </div> 
                    <div className='flex justify-center mt-6'>
                    {check==="Add Post"?
                    <button className='text-center text-bold bg-blue-600 hover:bg-blue-800 pt-3 pb-3 pl-10 pr-10 rounded '
                        onClick={async(e)=>{
                            e.preventDefault();
                            try{
                                const val={
                                    title:tit,
                                    description:des
                                }
                                const  data=await addBlog(val).unwrap();
                                console.log("done");
                                navigate("/");
                                window.location.reload();
                            }catch(err){
                                alert("something went wrong");
                            }
                        }}
                    >Post</button>:
                    <button className='text-center text-bold bg-blue-600 hover:bg-blue-800 pt-3 pb-3 pl-10 pr-10 rounded '
                        onClick={async(e)=>{
                            e.preventDefault();
                            try{
                                const val={
                                    id:location.state.id,
                                    body:{
                                        title:tit,description:des
                                    }
                                }
                                const data=await updateBlog(val).unwrap();
                                console.log("done");
                                navigate(`/${location.state.id}`);
                                window.location.reload();
                            }catch(err){
                                alert("something went wrong");
                            }
                        }}
                    >Update</button>}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Post