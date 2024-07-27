import React, { useContext, useEffect, useRef, useState } from 'react'
import SummeryApi from '../commonApi';
import { useSelector } from 'react-redux';
import { Context } from '../App';
import { Link } from 'react-router-dom';
import indianCurrrency from '../imgConvert/IndianCurrency';
import DeliveryAdd from '../component/DeliveryAdd';
import { FaChevronDown } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import EditAddress from '../component/EditAddress';
import PaymentSuccess from '../component/PaymentSuccess';

function Order() {
   let [AllOrderAfterPay,setAllOrderAfterPay]=useState({DeliveryAddress:[],orderProduct:[],totalPayment:0 })
   let [DeliveryAddByIdData,setDeliveryAddByIdData]=useState({});
  let [showPayment,setShowPayment]=useState(false);
  let [FinalPament,setFinalPament]=useState(false);
  let [editId,setEditId]=useState('');
  let [ShowEditPage,setShowEditPage]=useState(false);
  let [Address,setAddress]=useState(false)
  let [selectedLocation,setselectedLocation]=useState(null) 
let [order,setOredr]=useState([]);
let user=useSelector( state=>state?.user?.user);
let {fetchAddCartCount}=useContext(Context)
let [showDeliveryAdd,setshowDeliveryAdd]=useState(false);
let [deliveryLocation,setdeliveryLocation]=useState([]);

// onclick all cart data fetch in order page
let OrderData=async()=>{
try{
  // console.log(user._id)
let res=await fetch(SummeryApi.orderDatas.url+'/'+`${user?._id}`,{
    method:SummeryApi.orderDatas.method,
    credentials:'include'
})
let product=await res.json();
if(product.success){
 setOredr(product.order);
}
}
catch(e){
console.log('no order found')
}
}
//  console.log("order",order)

 

useEffect(()=>{
    OrderData();
    // deleteCartData();
},[])





// beling section
const TotalSelling = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.selling*currentValue.no;
  }, 0);
  // console.log(TotalSelling);
  
  const TotalPrice = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price*currentValue.no;
  }, 0);
  // console.log(TotalPrice);
  
  const totalQuantity = order.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.no;
  }, 0);

 
  // display delivery address
  let fetchDeliveryAddress=async()=>{
    try{
let res=await fetch(SummeryApi.DeliveryData.url,{
  method:SummeryApi.DeliveryData.method,
credentials:'include',
})

let data=await res.json();
// console.log(res)
if(data.success){
  // console.log(data);
  setdeliveryLocation(data.address);
}    
}
    catch(e){
console.log('data not come')
    }
  }
useEffect(()=>{
  fetchDeliveryAddress();
},[])

// console.log('deliv',deliveryLocation)



// redio button ,and get specific delivery address
let handelSelectionRedio= async(deliveryAddId,i,e)=>{
  setselectedLocation(i);
   try{
// console.log(deliveryAddId);
let deliveryAdddress=await fetch(SummeryApi.GetAddress.url+'/'+`${deliveryAddId}`,{
  method:SummeryApi.GetAddress.method,
  credentials:'include'
})

let data=await deliveryAdddress.json();
if(data.success){
  setDeliveryAddByIdData(data.address);
  setAddress(true)
}
  }
  catch(e){
    console.log('data not fetch of selected delivery add')
  }
 }
// console.log('DeliveryAddByIdData',DeliveryAddByIdData)


// deelete delivery address
let handelDeleteAddress=async(id)=>{
try{
  let res=await fetch(SummeryApi.DeleteDeliveryAdd.url+'/'+`${id}`,{
    method:SummeryApi.DeleteDeliveryAdd.method,
    credentials:'include'
  })
  let data=await res.json();
  if(data.success){
    toast.success('address delete succesfully');
    fetchDeliveryAddress();
  }

}
catch(e){
  toast.error('address not delete  ');

}
}


// edit delivery address
let handelEdit=(id)=>{
  setEditId(id);
  setShowEditPage(true)

 }


 
// after oredr cart empty and all cart data will delete
let deleteCartData=async()=>{
let res=await fetch(SummeryApi.DeleteCartData.url+'/'+`${user?._id}`,{
    method:SummeryApi.DeleteCartData.method,
    credentials:'include'
});
let data=await res.json();
if(data.success){
    fetchAddCartCount();
    console.log('delete success');
}
}


// post req for user all payment history
let AllorderAfterPayment= async()=>{
try{
  setFinalPament(true);
      AllOrderAfterPay.DeliveryAddress.push(DeliveryAddByIdData);

 for(let i of order){
  AllOrderAfterPay.orderProduct.push(i);
}
AllOrderAfterPay.totalPayment= (indianCurrrency(TotalSelling+(TotalSelling*.18)));
 console.log(AllOrderAfterPay.totalPayment );

// console.log(AllOrderAfterPay)
let res=await fetch(SummeryApi.UserAllOrder.url,{
  method:SummeryApi.UserAllOrder.method,
  credentials:'include',
     headers:{
      'Content-Type':'application/json'
   },
   body:JSON.stringify(AllOrderAfterPay)
  
})
// console.log(res);

let result=await res.json();
if(result.success){
  console.log('data store success');
}

}
catch(e){
  console.log('no data add')
}
}




  return (
    <div className='mt-[8vw] flex flex-col w-[98vw]'> 
 <div className='  flex    w-[98vw]   '>
      {/* col */}
      <div className='flex flex-col w-[64vw] mt-6    overflow-y-auto mx-2'> 

      {/* upload  DeliveryAdd */}
{showDeliveryAdd? <DeliveryAdd onClose={()=>setshowDeliveryAdd(false)} fetchDeliveryAddress={fetchDeliveryAddress}  />:null}

{/* edit page Eit Addresss component */}
{ShowEditPage?<EditAddress editId={editId}  onClose={()=>setShowEditPage(false)} fetchDeliveryAddress={fetchDeliveryAddress}    /> :null}

{/* col 1 */}
{/* for delivery detail  */}
  <div className='mt-3 flex flex-col'>
    <div className='flex flex-col p-2 shadow-xl'>
      <div className='flex justify-between items-center px-2' onClick={()=>setAddress(Address==true?false:true)}>
<a className='text-[4vw]  md:text-[3vw] font-semibold'>Delivery Detail</a>
<div className='text-2xl' >{!Address?<FaAngleRight/>:<FaChevronDown/>}</div>
      </div>
    {!Address?<div className='w-[80%] p-2 flex   flex-col  '>
{/* <a className='text-[1.7vw] md:text-[1.4vw]'>{deliveryAdd[0].name}</a> */}
 {deliveryLocation?.map((val,i)=>{
  return (
    <div key={i} className='flex items-start justify-start p-2 m-3 shadow-lg '>
     
     {/* flex col1  radio button for location or delivery address*/}
     <div className='w-[15%] mt-[1.2vw]'> 
 <input type="radio" name={`redio+${i}`}  checked={selectedLocation === i}  className='cursor-pointer self-start' onChange={()=>handelSelectionRedio(val._id,i)}/>

 </div>
 {/* flex col2 */}
<div className='flex flex-col w-[85%]'> 
  <div className='flex items-center justify-between py-[1vw] px-1'> 
<a className='line-clamp-2 text-[1.7vw] md:text-[1.4vw]'>Hoder:{val.name}</a>
<a className='px-3 py-1 text-[1.8vw] md:text-[1.7vw] font-bold cursor-pointer text-blue-600  self-start ' onClick={()=>handelEdit(val._id)}> EDIT</a>
</div>
<a className='line-clamp-2 text-[1.7vw] md:text-[1.4vw]'>Address:{val.Add}</a>
<a className='line-clamp-2 text-[1.7vw] md:text-[1.4vw] py-[1vw]'>phone:{val.phone}</a>
<a className='line-clamp-2 text-[1.7vw] md:text-[1.4vw]'>Pin:{val.pin}</a>
 <a className='line-clamp-2 text-[1.7vw] md:text-[1.4vw] py-[1vw]'>LandMark:{val.landMark}</a>   
  
  <div className='flex items-center justify-between px-1'>
    <button className='px-3 py-.5 md:py-1 text-[1.7vw] cursor-pointer md:text-[1.5vw] bg-blue-600 text-white rounded-lg self-start ' onClick={()=>handelSelectionRedio(val._id,i)}> Continue</button>
  <div className='text-2xl self-end text-red-600 cursor-pointer' onClick={()=>handelDeleteAddress(val._id)}><MdDelete/></div>
</div>
  </div>
  </div>
  )
 })}

<div className='flex p-1 items-center justify-between shadow-lg rounded-lg bg-blue-300'>
  <a className='text-[1.7vw] md:text-[1.5vw] text-white'>Add new</a>
<button className='px-3 py-1 text-[1.7vw] md:text-[1.5vw]  bg-blue-600 text-white rounded-lg ' onClick={()=>setshowDeliveryAdd(true)}> Add Delivery  </button>
 </div>
 
    </div >
    :null}
 </div>
</div>


{/* for paymnt detail  */}

<div className='mt-3 flex flex-col'>
<div className='flex flex-col p-2 shadow-xl'>
      <div className='flex justify-between items-center px-2' onClick={()=>setShowPayment(true)} >
 <a className='text-[4vw]  md:text-[3vw] font-semibold'>Payment Detail</a>
<div className='text-2xl' >{!showPayment?<FaAngleRight/>:<FaChevronDown/>}</div>
       </div>
       {
  showPayment?
  // payment ui

  <div className='flex flex-col p-2 mt-3'>
   <button onClick={AllorderAfterPayment } className='text-[3vw] text-red'>Pay Now</button>
  {FinalPament? <PaymentSuccess/>:null}

   </div>
  :null
 }
</div>
</div>
</div>
       {/* col 2 */}
      
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
<a className='text-[2.2vw] md:text-[2vw] font-semibold   text-red-500'  >{indianCurrrency(TotalSelling+(TotalSelling*.18))}</a>
</div>
<div className='w-[100%] h-[.5px] bg-black'></div>
<a className='text-[1.7vw] md:text-[1.5vw] font-semibold pt-3   text-green-500'>You will save ₹6,919 on this order </a>

 
  </div>
  </div>
  </div>
  
</div>
         
  )
}

export default Order
