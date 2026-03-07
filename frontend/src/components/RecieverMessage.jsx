import React from 'react'
import dp from '../assets/dp.jpg'
function RecieverMessage({image, message}) {
  return (
    <div>
      <div className='w-fit max-w-[500px] px-[20px] py-[5px] rounded-tl-none bg-blue-400 text-white text-xl p-5 rounded-2xl relative left-3  shadow-lg gap-[20px]'>
           {image &&  <img src={image} alt="" className='w-[120px] rounded-lg'/>}
          {message && <span>{message}</span>}
          </div>
    </div>
  )
}

export default RecieverMessage
