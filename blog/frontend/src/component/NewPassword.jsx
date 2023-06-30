import { useState } from "react";
import { useResetMutation } from "../service/user";
import { useParams,useNavigate } from "react-router-dom";
const NewPassword = () => {
    const token=useParams();
    const navigate=useNavigate();
    console.log(token);
    const [reset,okk]=useResetMutation();
    const [Password,setP]=useState("");
    return (
        <div className='flex align-middle justify-center bg-gray-800 h-screen'>
          <div className='flex flex-col align-middle justify-center'>
            <div className='bg-gray-900 p-10 flex flex-col text-white'>
              <div className='text-lg font-semibold mb-10'>Reset password</div>
              <form>
                <div className='p-2'>
                  <label>New Passowrd</label>
                  <input className='pl-4 rounded h-10 w-full overflow-auto text-black' 
                    placeholder='Enter new password'
                    onChange={(e)=>{setP(e.target.value)}}
                    value={Password}
                  />
                </div>
                <div className='mt-4 flex justify-center'>
                <button 
                  className='bg-blue-400 p-2 hover:bg-blue-600'
                  onClick={async(e)=>{
                    e.preventDefault();
                    if(Password){
                        const data=await reset({token:token.id,password:Password});
                        if(data.data.id){
                            navigate("/login");
                        }
                        else{
                            alert("Reset Link expired");
                            navigate("/forgotPassword");
                        }
                    }
                    else{
                        alert("Please enter the new password")
                    }
                  }}
                >Update</button></div>
              </form>
              </div>
          </div>
          </div>)
}

export default NewPassword