import { useState } from "react"
import { usePasswordMutation } from "../service/user";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
  const [Password,okk]=usePasswordMutation();
  const navigate=useNavigate();
  const [email,setE]=useState("");
  return (
      <div className='flex align-middle justify-center bg-gray-800 h-screen'>
        <div className='flex flex-col align-middle justify-center'>
          <div className='bg-gray-900 p-10 flex flex-col text-white'>
            <div className='text-lg font-semibold mb-10'>Forgot password</div>
            <form>
              <div className='p-2'>
                <label>Email</label>
                <input className='pl-4 rounded h-10 w-full overflow-auto text-black' 
                  placeholder='Enter your registered email'
                  onChange={(e)=>{setE(e.target.value)}}
                  value={email}
                />
              </div>
              <div className='mt-4 flex justify-center'>
              <button 
                className='bg-blue-400 p-2 hover:bg-blue-600'
                onClick={async(e)=>{
                  e.preventDefault();
                  if(email){
                    const data=await Password(email).unwrap()
                    if(data.token){
                    navigate(`/resetPassword/${data.token}`);}
                    else{setE("");alert("This email is not registered")}
                  }
                  else{
                    alert('Please enter the registered email')
                  }
                }}
              >Reset Link</button></div>
            </form>
            </div>
        </div>
        </div>
  )
}

export default Forgot