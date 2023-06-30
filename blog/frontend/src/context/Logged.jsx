import {createContext, useEffect,useState} from 'react';
import axios from 'axios';
export const AuthContext=createContext();
import { useLoggedInQuery } from '../service/user';
const Logged =(props) => {
    const[ok,setO]=useState(undefined);
    const check=async()=>{
      const data=await axios.get("http://localhost:5002/blog/loggedIn",{
        withCredentials:true
      });
      setO(data.data);
    }
    useEffect(()=>{
      check();
    },[])
  return (
    <AuthContext.Provider value={{ok,check}}>
    {props.children}
    </AuthContext.Provider>
  )
}
export {Logged};