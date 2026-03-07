import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'

import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function SignUp() {
    let navigate = useNavigate();
    let [show,setShow] = useState(false);
    let [username,setUserName] = useState("");
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [loading,setLoading] = useState(false);
    let [err,setErr] = useState("");
    let dispatch = useDispatch();
   
    const handleSignUp =async (e) =>{
        e.preventDefault()
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signUp`,
            {userName:username,email,password},
            {withCredentials:true});
            console.log(result);
            dispatch(setUserData(result.data))
            setEmail("");
            setPassword("");
            setLoading(false);
            setErr("");
            navigate("/profile")
        } catch (error) {
            console.log(error);
            setLoading(false);
            setErr(error.result.data.Message);
        }
    }
  return (
    <div className='w-full flex items-center justify-center'>
      <div  className='w-full max-w-[500px] h-[600px] bg-white rounded-2lg  shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
            <div className='w-full h-[200px] bg-blue-400 rounded-b-[30%]   shadow-gray-400 shadow-lg flex items-center justify-center'>
                <h1 className='text-gray-700 font-bold text-[30px]'>welcome to <span className='text-white'>CHATLY</span></h1>
            </div>
            <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}>
                <input type="text" placeholder='username' className='w-[90%] h-[50px] border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200'
                onChange={(e)=>setUserName(e.target.value)} value={username}/>
                <input type='email' placeholder='email' className='w-[90%] h-[50px] border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200'
                onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <div className='w-[90%] h-[50px] overflow-hidden border-2 border-[#bfdbfe] rounded-lg  shadow-gray-200 shadow-lg relative'>
                    <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full   px-[20px] py-[20px] bg-white outline-none'onChange={(e)=> setPassword(e.target.value)} value={password}/>
                    <span className='absolute top-[10px] right-[10px] text-[20px] font-bold text-blue-400 cursor-pointer' onClick={()=> setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
                </div>
                {err && <p className='text-red-500'>{err}</p>}
                <button className='px-[20px] py-[20px] bg-blue-500 shadow-gray-400 
                shadow-lg  rounded-2xl text-[20px] mt-[20px] font-semibold hover:shadow-inner'disabled={loading}>{loading?"Loading...":"SignUp"}</button>
                <p className='cursor-pointer' onClick={()=> navigate("/login")}>Already Have an Account ? <span className='text-blue-400 font-bold'>Login</span></p>
            </form>
      </div>
    </div>
  )
}

export default SignUp
