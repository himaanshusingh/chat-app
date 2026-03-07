import React, { useRef, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import dp from '../assets/dp.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerFill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import RecieverMessage from './RecieverMessage';
import { serverUrl } from '../main';
import axios from 'axios';
import {  setMessages } from '../redux/messageSlice';
function MessageArea() {
  let {selectedUser,userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [showPicker, setShowPicker] = useState(false)
  let [input,setInput] = useState("")
  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)
  let image = useRef()
   let {messages} = useSelector(state=> state.message)
  const handleSendImage = async (e)=>{
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("message",input);
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData,{withCredentials:true});

      dispatch(setMessages([...(messages || []),result.data]))
     
      console.log(result.data)
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
    } catch (error) {
      console.log(error)
    }
  }
  const handleImage = (e)=>{
    let file = e.target.files[0]
    console.log(file)
    setBackendImage(file)
    console.log(backendImage)
    setFrontendImage(URL.createObjectURL(file))
  }
  const emojiClick = (emojiData)=>{
    setInput(prev => prev+emojiData.emoji)
  }
  return (
    <div className={`lg:w-[70%] ${selectedUser?"flex":"hidden"} relative lg:block w-full h-full bg-white border-l-2 border-gray-300`}>

       {selectedUser && 
       <div className='w-full h-[100vh] flex flex-col'>
       <div   className='w-full h-[70px] bg-blue-400 rounded-b-[30px]   shadow-gray-400 shadow-lg flex  items-center px-[10px] gap-[10px]'>
          <div className='cursor-pointer'>
                      <GoArrowLeft className='w-[20px] h-[20px] text-gray-800 ' onClick={()=> dispatch(setSelectedUser(null))}/>
            </div>
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden '>
                        <img src={selectedUser?.image || dp} alt="" />
            </div>
            <h1 className='text-white font-semibold text-[15px]'>{selectedUser?.name || selectedUser?.userName}</h1>
       </div>
          <div className='w-full h-[200px] px-[20px] overflow-auto'>
            {showPicker &&
            <div className='absolute bottom-[120px]'><EmojiPicker width={350} height={350} onEmojiClick={emojiClick}/></div>
            }
            { messages && messages.map((mess,i)=>(
            mess.sender == userData._id ? <SenderMessage key={i} image={mess.image} message={mess.message}/> : <RecieverMessage image={mess.image} message={mess.message} key={i}/>
            ))}
      
          </div>
       </div>
       }
       

       {!selectedUser && 
       <div className='w-full h-full flex flex-col items-center justify-center'>
        <h1 className='text-gray-800 font-bold text-[30px]'>Welcome to Vibe...</h1>
        <h2> </h2>
       </div>
       }
       
       {selectedUser &&  <div className=' w-full lg:w-[70%] h-[70px] bg-white-500 fixed bottom-[20px] flex items-center ml-[150px]'>
         <img src={frontendImage} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg'/>
          <form className='w-[95%] h-[60px] lg:w-[60%] bg-blue-400 rounded-full flex items-center gap-[10px] px-[10px]' 
          onSubmit={handleSendImage}>
              <div  onClick={()=>setShowPicker(prev=> !prev) }>
                <RiEmojiStickerFill  className='w-[25px] h-[25px] text-white cursor-pointer'/>
              </div>
              <input type='file' accept='image/*' ref={image} hidden onChange={handleImage}/>
              <input type="text" className='w-full h-full bg-blue-400 px-[10px] border-0 outline-none text-[19px] 
              bg-transparent placeholder-white' placeholder='Message' onChange={(e)=> setInput(e.target.value)} value={input}/>
              <div onClick={()=> image.current.click()}>
                  <FaRegImages className='w-[25px] h-[25px] text-white '/>
              </div>
              {(input.length >0 || backendImage != null) &&<button>
                <IoMdSend className='w-[25px] h-[25px] text-white '/>
              </button>}
          </form>
        </div>
            }
    </div>
  )
}

export default MessageArea
