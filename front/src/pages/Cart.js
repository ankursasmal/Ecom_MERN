import React, { useContext, useEffect, useState } from 'react'
import SummeryApi from '../commonApi';
import indianCurrrency from '../imgConvert/IndianCurrency';
import '../App.css'
import minus from '../assect/minus.png'
import plus from '../assect/plus.png'
import { toast } from 'react-toastify';
import {Context} from '../App.js'
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  let navigate=useNavigate();
  let [cartData,setcartdata]=useState([]);
  let [No,setNo]=useState();
// update cart no in nav
let context=useContext(Context);
let {fetchAddCartCount,count}=context;
 // console.log(count)
 if(count==0){
  navigate('/');
 }

let fetchCartDate=async()=>{
  try{
 let res=await fetch(SummeryApi.AddcartItems.url,{
  method:SummeryApi.AddcartItems.method,
  credentials:'include'
 })
 let result=await res.json();
 if(result.success){
  setcartdata(result.items);
  }

}
catch(e){
  console.log('data not come ',e.message)
}
}

useEffect(()=>{
  fetchCartDate();
},[])
// console.log(cartData)

 
// quentity 
let DecrementCartItemQuentity= async(id,qun)=>{
try{
  if(qun>1){
let res=await fetch(SummeryApi.NoOfItems.url+'/'+`${id}`,{
  method:SummeryApi.NoOfItems.method,
  credentials:'include',
  headers:{
    'Content-Type':'application/json',
 }, 
  body:JSON.stringify({
    no:qun-1
  })
})

let data=await res.json();
if(data.success){
  fetchCartDate();
      //it is important to reflect instant change

  toast.success('update succcess full')
}
  }
  else{
    throw new Error('update not possible')
  }

}
catch(e){
  toast.error('update not succcess full')

}
}
let IncrementCartItemQuentity= async(id,qun)=>{
  try{
    
  let res=await fetch(SummeryApi.NoOfItems.url+'/'+`${id}`,{
    method:SummeryApi.NoOfItems.method,
    credentials:'include',
    headers:{
      'Content-Type':'application/json',
   }, 
    body:JSON.stringify({
      no:qun+1
    })
  })
  
  let data=await res.json();
  if(data.success){
    //it is important to reflect instant change
    fetchCartDate();
    toast.success('update succcess full')
  }
  
  }
  catch(e){
    toast.error('update not succcess full')
  
  }
  }

// delete catr items
let DeleteCartItems= async(id)=>{
  try{
  
  let res=await fetch(SummeryApi.DeleteCartItems.url+'/'+`${id}`,{
    method:SummeryApi.DeleteCartItems.method,
    
  })
  
  let data=await res.json();
  if(data.success){
    //it is important to reflect instant change
    fetchCartDate();
    // for update nav cart no
    fetchAddCartCount();
  
     toast.success('delete succcess full');
      
  }
  
  }
  catch(e){
    toast.error('delete not succcess full')
  
  }
  }

//  console.log( cartData)
// beling section
const TotalSelling = cartData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.selling*currentValue.no;
}, 0);
// console.log(TotalSelling);

const TotalPrice = cartData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.price*currentValue.no;
}, 0);
// console.log(TotalPrice);

const totalQuantity = cartData.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.no;
}, 0);
// console.log(totalQuantity)


  return (
    <div className='mt-[7vw] flex flex-col w-[98vw]'> 
 <div className='  flex    w-[98vw]   '>
      {/* col */}
      <div className='flex flex-col w-[64vw]    overflow-y-auto'> 
      <h1 className='text-[4.4vw] md:text-[3.2vw] mt-6 md:mt-2  mb-2  font-semibold text-center self-center text-blue-400 '> Cart Items</h1>
      <div className='flex scrollber items-center justify-center   mx-auto shadow-md p-7'>
<div className='flex w-[100%] p-3   flex-col '>
  {cartData?.map((cartData,i)=>{
  return(
    <>
    <div key={i}  className='flex w-[100%] items-center shadow-xl bg-slate-200 justify-center p-2 m-3 '>

   <div  className='flex flex-col w-[30%]   '>
       <img src={cartData.productimg?.[0]}   className='w-[100%] [8vh] lg:h-[11vh] hover:scale-110 transition-all m-1 -mt-1'  />
<div className='flex items-center justify-center p-1 mt-[3vw]'>
<button onClick={()=>DecrementCartItemQuentity(cartData._id,cartData.no)}><img src={plus} alt="" className='w-[2.5vw] hover:bg-red-500 rounded-full' /></button>
<a className='p-2 rounded-md text-[2vw] '>{cartData.no}</a>
<button onClick={()=>IncrementCartItemQuentity(cartData._id,cartData.no)} ><img src={minus} alt=""  className='w-[2.0vw]  hover:bg-red-500 rounded-full'/></button>

</div>
</div>
<div className='flex items-start flex-col justify-start w-[60%] mx-auto  pl-[2vw]  mr-[2vw]'>
  <a className='text-[2.4vw] md:text-[2vw] font-semibold line-clamp-3'>{cartData.description  } </a>
  <a className='text-[2.2vw] md:text-[2vw] font-semibold  text-blue-500'>Product:{cartData.productname  } </a>

  <a className='text-[2.4vw] md:text-[2vw] font-normal my-[.7vw] '><span className='text-[2.4vw] md:text-[2vw] font-bold '>Brendname:</span> {cartData.brendname  } </a>
   <a className='text-[2.2vw] md:text-[2vw] font-semibold   text-blue-500'><span className='text-[2.4vw] md:text-[2vw] font-bold text-red-400 '>Selling Price:</span>{indianCurrrency(cartData.selling)  } </a>
   <button className='px-4 py-1 mt-[1.3vw] bg-red-400 text-white rounded-md' onClick={()=>DeleteCartItems(cartData._id)}>Remove</button>
 
  </div>
  </div>
   </>
  )}
  )}


</div>
</div>
</div>

       {/* col */}
      
  <div className=' w-[34vw] ml-2   mt-[25px]'>
<div className='flex flex-col items-start justify-start w-[100%] shadow-xl p-4    bg-slate-200'>
<a className='text-[3.2vw] md:text-[3vw] font-medium my-4 '>PRICE DETAILS</a>
<div className='w-[100%] h-[.5px] bg-black'></div>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold mt-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold '> Price({`${totalQuantity}`}):{"   "}</span>{indianCurrrency(TotalSelling)  } </a>
      <a className='text-[2.2vw] md:text-[2vw] font-semibold my-3  text-blue-500'><span className='text-[2.4vw] md:text-[2vw] my-3 font-bold '> Tax(GST):{"   "}</span>{indianCurrrency((TotalSelling*.18))  } </a>

<a className='text-[2.4vw] md:text-[2vw] font-semibold line-clamp-3'>Discount:{"   "}{indianCurrrency(TotalPrice-TotalSelling)} </a>
 
     <a className='text-[2.4vw] md:text-[2vw] font-normal my-[.7vw] '>Delivery Charges: {"   "}Free Delivery </a>

   <div className='w-[100%] h-[.5px] bg-black'></div>
<div className='flex justify-between items-center py-3 w-[100%]'>
<a className='text-[2.2vw] md:text-[2vw] font-semibold   text-blue-500'>Total Amount:</a>
<a className='text-[2.2vw] md:text-[2vw] font-semibold   text-red-500'>{indianCurrrency(TotalSelling+(TotalSelling*.18))}</a>
</div>
<div className='w-[100%] h-[.5px] bg-black'></div>
<a className='text-[1.7vw] md:text-[1.5vw] font-semibold pt-3   text-green-500'>You will save ₹6,919 on this order </a>

<Link to='/order' className='self-end'> <button className='px-4 mt-5 py-1   bg-red-400 text-white rounded-md text-[1.9vw] md:text-[1.5vw]'>PLACE ORDER</button></Link>

  </div>
  </div>
  </div>
  
</div>
         
   )
}

export default Cart
