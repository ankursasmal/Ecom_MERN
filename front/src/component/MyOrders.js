import React, { useEffect, useState } from 'react'
import SummeryApi from '../commonApi';
import indianCurrrency from '../imgConvert/IndianCurrency';

function MyOrders() {
    let [orders,setOrders]=useState([]);
 
    let fetchAllOrders=async()=>{
        try{
let res=await fetch(SummeryApi.MyOrder.url,{
    method:SummeryApi.MyOrder.method,
    credentials:'include'
})
let data=await res.json();
if(data.success){
    setOrders(data.order);
}
        }
        catch(e){
console.log('data not fetch in My order')
        }
    }
useEffect(()=>{
    fetchAllOrders();
},[])
//  console.log(items?.DeliveryAddress[0]?.Add )
// console.log(orders[1].totalPayment)
  return (
    <div className='mt-[12vw] md:mt-[9vw] flex flex-col w-[98vw]'> 
          <h1 className='text-[4.4vw] md:text-[3.2vw] my-2  font-semibold text-center self-center text-blue-400 '> My Oredrs </h1>

 {orders.map((items,i)=>{
    return(
  <div   className='  flex    w-[98vw]  bg-[#8ce3f5] ml-2 mb-[3vw] rounded-lg'>
      {/* col */}
      <div className='flex items-center w-[64vw] flex-col     overflow-y-auto'> 
       <div className='flex scrollber items-center justify-center   mx-auto shadow-md p-3'>
      
 <div className='flex w-[100%] p-3   flex-col '>
  {items?.orderProduct?.map((cartData,i)=>{
  return(
    <>
     <div key={i}  className='flex w-[100%] items-center shadow-xl bg-slate-200 justify-center p-2 m-3 '>

   <div  className='flex flex-col w-[30%]   '>
       <img src={cartData.productimg?.[0]}   className='w-[100%] [8vh] lg:h-[11vh] hover:scale-110 transition-all m-1 -mt-1'  />
 
</div>
<div className='flex items-start flex-col justify-start w-[60%] mx-auto  pl-[2vw]  mr-[2vw]'>
   <a className='text-[2.2vw] md:text-[2vw] font-semibold  text-blue-500'>Product:{cartData.productname  } </a>

  <a className='text-[2.4vw] md:text-[2vw] font-normal my-[.7vw] '><span className='text-[2.4vw] md:text-[2vw] font-bold '>Brendname:</span> {cartData.brendname  } </a>
  <a className='text-[2.2vw] md:text-[2vw] font-semibold   text-blue-500'><span className='text-[2.4vw] md:text-[2vw] font-bold text-red-400 '>  Price:</span>{indianCurrrency(cartData.selling)  } </a>

  </div>
  </div> 
   </>
  )}
  )}
  </div>
</div>
{/* for total ammount */}
<div className='w-[80%] h-[2px] bg-black mt-6 mb-2 flex justify-center items-center mx-[10%]'></div>
  <div className='flex justify-between items-center py-3 mx-[10%] w-[80%]'>
<a className='text-[2.2vw] md:text-[2vw] font-semibold   text-blue-500'>Total Amount:</a>
<a className='text-[2.2vw] md:text-[2vw] font-semibold   text-red-500'>{items.totalPayment}</a>
</div> 
</div>
 
 


 
       {/* col */}
      
  <div className=' w-[34vw] ml-2   mt-[25px]'>
<div className='flex flex-col items-start justify-start w-[100%] shadow-xl p-4    bg-slate-200'>
<a className='text-[3.2vw] md:text-[3vw] font-medium my-4 '>Delivery DETAILS</a>
<div className='w-[100%] h-[.5px] bg-black'></div>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold mt-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold  text-[#979905]'>  Holder Name:{"   "}</span>{items?.DeliveryAddress[0]?.name  } </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold mt-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold text-[#979905]'> Address:{"   "}</span>{ items?.DeliveryAddress[0]?.Add } </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold mt-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold text-[#979905]'> Phone:{"   "}</span>{ items?.DeliveryAddress[0]?.phone} </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold mt-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold text-[#979905]'> Pin no.:{"   "}</span>{ items?.DeliveryAddress[0]?.pin   } </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold my-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold text-[#979905]'> LandMark:{"   "}</span>{ items?.DeliveryAddress[0]?.landMark   } </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold my-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] mb-3 font-bold text-[#979905]'> date:{"   "}</span>{ items?.DeliveryAddress[0]?.date   } </a>

</div>
  </div>
  </div>      
    )
 })}
  
 
 
</div>
  )
}

export default MyOrders
 