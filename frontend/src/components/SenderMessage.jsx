import React from 'react'
import dp from '../assets/dp.jpg'
function SenderMessage({image,message}) {
  return (
    <div className='w-fit max-w-[500px] px-[20px] py-[5px] rounded-tr-none bg-blue-400 text-white text-xl p-5 rounded-2xl relative right-3 ml-auto mt-[10px] shadow-lg gap-[20px]'>
      {image && <img src={image} alt="" className='w-[120px] rounded-lg'/>}
      {message && <span>{message}</span>}
    </div>
  )
}

export default SenderMessage
