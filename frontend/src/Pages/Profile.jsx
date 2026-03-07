import  { useRef, useState } from 'react'
import dp from "../assets/dp.jpg"
import { IoIosCamera } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
function Profile() {
    let {userData} = useSelector(state=> state.user)
    let navigate = useNavigate()
    let [name,setName] = useState(userData.name || "")
    let [frontImage,setFrontImage] = useState(userData?.image || dp)
    let [backendImage,setBackendImage] = useState(null)
    let image = useRef()
    let dispatch = useDispatch()
    let [saving,setSaving] = useState(false);
    const handleImage = (e)=>{
        let file = e.target.files[0];
        setBackendImage(file);
        setFrontImage(URL.createObjectURL(file))
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setSaving(true);
        try {
            let formData = new FormData()
            formData.append("name",name)
            if(backendImage){
                formData.append("image",backendImage);
            }
            let result = await axios.put(`${serverUrl}/api/user/profile`,formData,{
              withCredentials: true
              
            });
            setSaving(false);
            dispatch(setUserData(result.data));
           
            console.log(result.data)
            
        } catch (error) {
            console.log(error);
            setSaving(false)
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
        <div className='fixed top-[20px] left-[20px]'>
            <GoArrowLeft className='w-[30px] h-[30px] text-gray-500 ' onClick={()=> navigate("/")}/>
        </div>
      <div className=' bg-white rounded-full border-2 border-blue-400 shadow-gray-400 shadow-lg overflow-hidden relative gap-[20px]'onClick={()=>image.current.click()}>
        <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
            <img src={frontImage} alt="" />
        </div>
        <IoIosCamera className='absolute w-[25px] h-[25px] bottom-8 right-5 cursor-pointer hover:w-[30px] hover:h-[30px]'/>
      </div>
      <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center'onSubmit={handleSubmit}>
        <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>
        <input type='text' placeholder='Enter your name' className='w-[90%] h-[50px] border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200' onChange={(e)=>setName(e.target.value)} value={name}/>
        <input type='text' readOnly className='w-[90%] h-[50px] text-gray-400 border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200'value={userData?.userName}/>
        <input type='email' readOnly className='w-[90%] h-[50px] text-gray-400 border-2 border-[#bfdbfe] px-[20px] py-[20px] bg-white outline-none rounded-lg shadow-gray-200'value={userData?.email}/>
        <button className='px-[20px] py-[20px] bg-blue-500 shadow-gray-400 
                shadow-lg  rounded-2xl text-[20px] mt-[20px] font-semibold hover:shadow-inner' disabled={saving}>{saving?"saving...":"Save Profile"}</button> 
      </form>
    </div>
  )
}

export default Profile
