import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

function ShowImgBigSize({image,onClose}) {
    // console.log(image)
    let [BigImgUrl,setBigImgUrl]=useState(image);

    useEffect(()=>{
setBigImgUrl(image);
 },[image])
    // console.log(BigImgUrl)

  return (
    <div className=' absolute w-[100vw] top-[10vw]  left-0 h-[100%] bg-slate-200  bg-opacity-40   flex justify-center items-center z-10 '>
    <div className='  rounded absolute top-[80px] left-[5vw] md:left-[20vw] p-4  w-[90%]   md:w-[60%]  bg-white  '>
 <div className='flex flex-col'>
<div className='self-end text-3xl' onClick={onClose}><RxCross2/></div>
     <img src={BigImgUrl} alt=""  className='w-[100%]'/>

  </div>
     </div>
    </div>
  )
}

export default ShowImgBigSize
