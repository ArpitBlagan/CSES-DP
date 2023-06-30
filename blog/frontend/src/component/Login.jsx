import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../service/user";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Logged";

const Login = () => {
    const {check}=useContext(AuthContext);
    const [email,setE]=useState("");
    const [password,setP]=useState("");
    const [loginUser,ok]=useLoginUserMutation();
    const navigate=useNavigate();
    
  return (<div className='h-screen flex bg-gray-700 justify-center align-middle'>
            <div className='flex flex-col justify-center align-middle p-10'>
                <div className='bg-gray-900 pl-20 pr-20 pb-10 pt-10'>
                <div className='text-lg  text-center mb-10 text-white font-bold'>Login to your account</div>
                <div>
                    <form>
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
                                    if(email&&password){
                                        try{
                                            const res=await loginUser({email,password}).unwrap();
                                            const ff=()=>{check();}
                                            ff();
                                            alert("Login successfully");
                                            navigate("/");
                                        }
                                        catch(err){
                                            alert(err.message);
                                            setE("");setP("");
                                        }
                                    }
                                    else{
                                        alert("email and password is required");
                                    }
                                }}
                            >Login</button>
                        </div>
                    </form>
                    <Link to="/forgot"><div className="text-center cursor-pointer">Forgot Password</div></Link>
                </div>
            </div></div>
    </div>
  )
}

export default Login