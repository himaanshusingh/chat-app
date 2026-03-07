import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import dp from '../assets/dp.jpg'
import axios from 'axios';
import { serverUrl } from '../main';
import { setOthersData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
    let {userData,othersData,selectedUser} = useSelector(state=>state.user)
    let [search,setSearch] = useState(false);
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const handleLogout = async ()=>{
      try {
         let result = await axios.get(`${serverUrl}/api/auth/logOut`,
          {withCredentials:true}
         );
         dispatch(setUserData(null))
         dispatch(setOthersData(null))
         navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className={`lg:w-[30%] w-full h-full lg:block ${!selectedUser?"block":"hidden"} bg-white overflow-y-scroll `}>
        <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center  shadow-gray-300 mt-[10px] fixed bottom-[20px] left-[10px] bg-blue-500' onClick={handleLogout}>
            <BiLogOut  className='w-[25px] h-[25px] cursor-pointer'/>
          </div>
        <div   className='w-full h-[300px] bg-blue-400 rounded-b-[30%]   shadow-gray-400 shadow-lg flex flex-col justify-center px-[5px]'>
        <h1 className='text-white font-semibold text-[25px]'>Vibe</h1>
        <div className='w-full flex justify-between items-center'>
            <h1 className='text-black-800 font-bold'>Hii, {userData.name || "user"}</h1>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden ' onClick={()=> navigate("/profile")}>
            <img src={userData.image || dp} alt="" />
            </div>
        </div>
          <div className='w-full flex gap-[20px] mt-[10px]'>
             {!search && <div>
            <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white shadow-gray-300 mt-[10px]' onClick={()=>setSearch(true)}>
            <IoIosSearch className='w-[25px] h-[25px]'/>
            </div>
            </div>}

            {search && 
              <form className='w-full h-[60px] rounded-full flex bg-white shadow-gray-300 overflow-hidden mt-[10px] gap-[10px] 
               justify-center items-center px-[20px]'>
                <IoIosSearch className='w-[25px] h-[25px]'/>
                <input type='text' placeholder='search users...' className='w-full h-full outline-0 border-0 '/>
                <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)}/>
              </form>}
              {!search && othersData?.map((user)=>(
                 <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-200 mt-[10px]'>
                    <img src={user.image || dp} alt="" />
                </div>
                 ))}
              
          </div> 
        </div>
        <div className='w-full h-[60vh]  overflow-auto flex flex-col gap-[10px] mt-[10px] pl-[10px]'>
          {othersData?.map((user) => (
            
          <div key={user._id} className='w-[95%] h-[50px] flex justify-start items-center bg-white rounded-full shadow-lg shadow-gray-300 cursor-pointer hover:bg-slate-300'onClick={()=>dispatch(setSelectedUser(user))}>
              <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-200'>
                    <img src={user.image || dp} alt="" />
            </div>
            <h1 className='pl-[10px]'>{user.name || user.userName}</h1>
          </div>
         
          ))}
         
        </div>
        
    </div>
  )
}

export default Sidebar
