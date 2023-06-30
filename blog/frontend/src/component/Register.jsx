import { useState } from "react"
import { useRegisterMutation } from "../service/user";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Logged";
import { useContext } from "react";
const Register = () => {
    const ff=useContext(AuthContext);
    console.log(ff);
    const [register,ok]=useRegisterMutation();
    const navigate=useNavigate();
    const [name,setN]=useState("");
    const [email,setE]=useState("");
    const [password,setP]=useState("");
  return (<div className='h-screen flex bg-gray-700 justify-center align-middle'>
            <div className='flex flex-col justify-center align-middle p-10'>
                <div className='bg-gray-900 pl-20 pr-20 pb-10 pt-10'>
                <div className='text-lg  text-center mb-10 text-white font-bold'>Register</div>
                <div>
                    <form>
                        <div className='mb-5'>
                            <h5 className='text-white text-lg font-semibold'>Name</h5>
                            <input className='rounded pl-8 text-grey-dark h-10  w-full text-sm font-medium tracking-wide'
                                onChange={(e)=>{setN(e.target.value)}}
                                value={name}
                             placeholder='Enter your name'/>
                        </div>
                        <div className='mb-5'>
                            <h5 className='text-white text-lg font-semibold'>Email</h5>
                            <input className='rounded pl-8 text-grey-dark h-10  w-full text-sm font-medium tracking-wide'
                                onChange={(e)=>{setE(e.target.value)}}
                                value={email}
                             placeholder='Enter your email'/>
                        </div>
                        <div className='mb-8'>
                            <h5 className='text-white text-lg font-semibold'>Password</h5>
                            <input className='rounded pl-8 text-grey-dark h-10  w-full text-sm font-medium tracking-wide' 
                                onChange={(e)=>{setP(e.target.value)}}
                                value={password}
                            placeholder='Enter your password'/>
                        </div>
                        <div className='mb-5 flex align-middle justify-center'>
                            <button 
                                className='rounded font-bold pl-5 pr-5 pt-3 pb-3 bg-blue-700'
                                onClick={async(e)=>{
                                    e.preventDefault();
                                    if(!email||!name||!password){
                                        alert("all fields are required");
                                    }
                                    else{
                                        try{
                                            const res=await register({name,email,password}).unwrap();
                                            alert("Registered successfully now redirecting to login page❤️");
                                            navigate("/login");
                                        }   
                                        catch(err){
                                            alert(err.data.message);
                                        }
                                    }
                                }}    
                            >Register</button>
                        </div>
                    </form>
                </div>
            </div></div>
    </div>
  )
}

export default Register