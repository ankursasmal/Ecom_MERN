import React from 'react'

function Footer() {
  return (
    <div className='  w-[100%]  ' >
      <div className='flex items-center  justify-center py-[1.6vw] bg-slate-800 '>
        <a href='#' className='text-[1.7vw] self-center md:text-[1.6vw] font-semibold text-white'>BACK TO TOP</a>
      </div>
<div className="flex items-center justify-center flex-col py-2 bg-black">
  <div className='flex items-center justify-center'> 
  <a className='text-[1.6vw] md:text-[1.4vw] text-white'>Conditions of Use & Sale</a> 
   <a className='text-[1.6vw] md:text-[1.4vw] text-white' >Privacy Notice</a>
<a className='text-[1.6vw] md:text-[1.4vw] text-white'>Interest-Based Ads</a> 
</div>
 <span className='text-[1.6vw] md:text-[1.4vw] text-white'>© 1996-2024, Amazon.com, Inc. or its affiliates</span>
</div>    </div>
  )
}

export default Footer
