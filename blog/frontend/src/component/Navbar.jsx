import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Logged";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const {ok,check}=useContext(AuthContext);
  const navigate=useNavigate();
  
  const handleClick = () => {
    axios.get('http://localhost:5002/blog/logout',{
      withCredentials:true
    })
      .then(response => {
        // Handle the response data
        console.log(response.data);
        check();
        alert("You are logged out");
        navigate("/");
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };
  return (
    <div className='top-0 sticky  flex justify-between w-screen align-middle p-4 bg-gray-900 text-white'>
    <div className='flex'>
        <Link to="/"><div className='m-2 cursor-pointer'>Blogs</div></Link>
        {ok?<div className="flex">
        <Link to="/post"><div className="m-2">Add a blog</div></Link></div>:<div></div>}
    </div>
    <div className="mr-4">
        {ok?
          <button className='m-2'
            onClick={(e)=>{
              e.preventDefault();
              console.log("click");
              handleClick();
            }}
          >Logout</button>
        :<div className="flex"><Link to="/login"><button className='m-2'>Login</button></Link>
        <Link to="/register"><button className='m-2'>Register</button></Link></div>}
    </div>
    </div>
  )
}

export default Navbar