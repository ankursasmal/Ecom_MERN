import React, { useEffect, useState } from 'react'
import ad1 from '../assect/ad1.jpeg'
import ad2 from '../assect/ad2.jpeg'
import ad3 from '../assect/ad3.avif'
import ad4 from '../assect/ad4.jpeg'
import ad5 from '../assect/ad5.webp'
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Carsole() {
    // img transform arry formet
    let imgarray=[ad3,ad2,ad1,ad4,ad5];
    let [currentimg,setcurrentimg]=useState(0);

//   // for auto cursole
useEffect(() => { 

  // setInterval alwasy req name because clearInterval take name which is stoped as rgument
  const interval = setInterval(() => {
    if (currentimg < imgarray.length - 1) {
      setcurrentimg(currentimg => currentimg + 1);
    } else {
      setcurrentimg(0);
    }
  }, 2000);
  // this is clean up function must use when use timeinetreval else unexpeccted behavioue notice
  return () => clearInterval(interval);
}, [currentimg]);


return (
    <div className=' w-full mx-auto rounded overflow-hidden  relative' style={{zIndex:'-1'}}>
      <div className= 'h-45 md:h-80 scroll overflow-x-auto flex items-center'>
        {imgarray.map((img,i)=>{
            // for min-w-100% it take full (minmum 100%)
           return (
             <div className='h-[100%]  min-w-[100%]'> 
<img src={img} className='h-[100%] w-[100%]' alt="" style={{transform:`translateX(-${currentimg*100}%)`}} />   
<button className='absolute top-[6rem] md:top-[8.5rem] right-7 text-[4vw] w-10 h-10 rounded-full bg-white flex items-center justify-center' onClick={()=>{setcurrentimg(currentimg => (currentimg < imgarray.length - 1 ? currentimg + 1 : 0))}}><MdKeyboardArrowRight className='text-[5vw]'/></button>
<button className='absolute top-[6rem] md:top-[8.5rem] left-7 text-[4vw]  w-10 h-10  rounded-full bg-white flex items-center justify-center' onClick={()=>{ setcurrentimg(currentimg => (currentimg > 0 ? currentimg - 1 : imgarray.length - 1))}}><MdKeyboardArrowLeft className='text-[5vw]'/></button>

</div>)
        })}
    </div>
    </div>
  )
}

export default Carsole
