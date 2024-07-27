import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';

function PaymentSuccess() {
    let {fetchAddCartCount}=useContext(Context);
    // console.log(fetchAddCartCount)
 let navigate=useNavigate();

    let handeldeleteCartData=async()=>{
        try{
let res=await fetch(SummeryApi.EmptyCart.url,{
    method:SummeryApi.EmptyCart.method,
    credentials:'include'
})
 console.log(res)
let result=await res.json();
if(result.success){
    fetchAddCartCount();
    navigate('/');
}
        }
        catch(e){
console.log('cart not empty after payment',e.message)
        }
    }


 return (
   <div className=' w-[100vw] h-[100vh] bg-slate-200  absolute top-[0vw] left-[0vw] bg-opacity-50 transition-all  '>
     <div className='bg-green-600 rounded  lg:w-[30vw] h-[30] lg:h-[40vh] mt-[14vw]  absolute top-[10vw] left-[35vw] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
           <div className='flex items-center justify-between px-2'>
             <div className='flex flex-col items-center justify-center w-[100%] h-[20vh]'> 
              <h1 className='text-[4vw] md:text-[3vw]  font-semibold '>Payment Success</h1> 
           {/* props through onClose Function call */}
   <button className='px-2 py-.5 bg-red-400 text-blue-50 rounded-lg text-[1.7vw] md:text-[1.5vw] ' onClick={handeldeleteCartData}>OK</button> 
           </div>
            </div>
          

  </div>    </div>
 )
}

export default PaymentSuccess
