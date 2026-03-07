import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice';

function Login() {
  let navigate = useNavigate();
    let [show,setShow] = useState(false);
    let [email,setEmail] = useState("");
    let [password,setPassword] = useState("");
    let [loading,setLoading] = useState(false);
    let [err,setErr] = useState("");
    let dispatch = useDispatch();
   

    const handleLogin = async (e)=>{
      e.preventDefault();
      setLoading(true);
      try {
        let result = await axios.post(`${serverUrl}/api/auth/login`,
          {email,password},
          {withCredentials:true});
        console.log(result); 
        dispatch(setUserData(result.data))
        dispatch(setSelectedUser(null))
        setEmail("");
        setPassword("");
        setLoading(false);
        setErr("");
        navigate("/")
      } catch (error) {
        console.log(error);
        setLoading(false);
        setErr(error.result.data.message);
      }
    }
  return (
    <div className='w-full h-full bg-slate-200 flex items-center justify-center'>
      <div  className='w-full max-w-[500px] h-[600px] bg-white rounded-2lg  shadow-gray-400 shadow-lg flex flex-col gap-[10px]'>
            <div className='w-full h-[200px] bg-blue-400 rounded-b-[30%]   shadow-gray-400 shadow-lg flex items-center justify-center'>
                <h1 className='text-gray-700 font-bold text-[30px]'>Login to <span className='text-white'>CHATLY</span></h1>
            </div>
            <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
                
                <input type='email' placeholder='email' className='w-[90%] h-[50px] border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                <div className='w-[90%] h-[50px] overflow-hidden border-2 border-[#bfdbfe] rounded-lg  shadow-gray-200 shadow-lg relative'>
                    <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full   px-[20px] py-[20px] bg-white outline-none'onChange={(e)=>setPassword(e.target.value)} value={password}/>
                    <span className='absolute top-[10px] right-[10px] text-[20px] font-bold text-blue-400 cursor-pointer' onClick={()=> setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
                </div>
                {err && <p className='text-red-500'>{err}</p>}
                <button className='px-[20px] py-[20px] bg-blue-500 shadow-gray-400 
                shadow-lg  rounded-2xl text-[20px] mt-[20px] font-semibold hover:shadow-inner w-[200px]'disabled={loading}>{loading?"Loading...":"Login"}</button>
                <p className='cursor-pointer' onClick={()=> navigate("/signup")}>Want to create Account ? <span className='text-blue-400 font-bold'>signUp</span></p>
            </form>
      </div>
    </div>
  )
}

export default Login
