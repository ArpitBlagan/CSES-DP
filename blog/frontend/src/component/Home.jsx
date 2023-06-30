import { useEffect, useState } from 'react';
import { useGetBlogsQuery } from '../service/blogs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Logged';
import Cookie from 'js-cookie';
const Home = () => {
  const {ok,check}=useContext(AuthContext);
  const val=Cookie.get('id');
  const [search,setS]=useState("");
  const [ff,setF]=useState([]);
  const {data,isFetching}=useGetBlogsQuery();
  console.log(data);
  const navigate=useNavigate();
 useEffect(()=>{
  const fff=data?.data?.filter(ele=>{
    return ele.title.toLowerCase().includes(search.toLocaleLowerCase());
 });
 setF(fff);
 },[search,data]);
 if(isFetching){
  return <div>Loading..</div>
}
  return (
  <>
        <form className='bg-gray-500 flex justify-center align-middle p-4'>   
        <img src="https://www.iconpacks.net/icons/2/free-search-icon-3076-thumb.png" className='p-2 h-10 bg-white'/>
        <div className='mr-4'>
            <input className='h-10 w-full pl-10 pr-10' placeholder='Search topic'
                onChange={(e)=>{setS(e.target.value)}}
                value={search}
            />
        </div>
     </form>
        <div className='grid grid-cols-3 gap-2 text-white font-semibold m-2'>
        {ff?.map((ele,index)=>(<div className='flex flex-col justify-start shadow p-2 bg-slate-700' key={index}>
              <div className='truncate text-center m-5'>{ele.title}</div>
              <div className='flex justify-between'>
                <div className='truncate'>
                {ok?<button 
                  className='p-2 bg-blue-400 hover:bg-blue-800 rounded'
                  onClick={(e)=>{
                    e.preventDefault();
                    console.log(ele);
                    navigate(`/${ele._id}`);
                  }}
                >Details</button>:
                <button className='p-2 bg-blue-400 hover:bg-blue-800 rounded'
                  onClick={e=>{e.preventDefault();alert("login required")}}
                >Details</button>
                }
                </div>
                <div className='truncate'>{ele.createdAt}</div>
              </div>
            </div>
        ))}</div>
    </>
  )
}

export default Home