import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CiLogout } from "react-icons/ci";
import SummeryApi from '../commonApi';
import { FaRegUserCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCartOutline } from "react-icons/io5";
import '../App.css'
function DashBoard({onClose}) {
let user=useSelector(state=>state?.user?.user);
    let dispatch=useDispatch();
  let navigete=useNavigate();
  // console.log(user)
  
  // for logout

let handelLogout=async()=>{
  try{
let res= await fetch(SummeryApi.Logout.url,{
    method:SummeryApi.Logout.method,
    headers:{
       'Content-Type':'application/json',
    },   
    credentials:"include"
     })
     let data=await res.json();
     if(data.success){
      toast.success('Logout success');
      // afetr logout user detail will null it neccery
      dispatch(setUserDetails(null));
      navigete('/login')
     }
     else{
      throw new Error('lougot not success')
     }
  }
  catch(e){
      console.log('not login');
      toast.error(e.message);

  }
}


  return (
    <div className='block lg:hidden  '> 

    <div className='absolute dashbord flex items-start flex-col top-[12vw] md:top-[7vw] right-[40vw] w-[25vw]   bg-[#dccbf9] p-2 shadow-lg'>
           
    {user?.role=='ADMIN'?<div className='flex items-center justify-between w-[100%]'>
  <a className='text-[3vw] font-semibold text-red-500'>Retailer</a> 
  <a className='  mr-[.5vw]  ' onClick={onClose}><RxCross2 className='text-3xl'/></a>
   </div>:  
   <div className='flex justify-end mr-[.5vw] self-end  ' onClick={onClose}><RxCross2 className='text-3xl'/></div>
   }

 <Link to='/all-user' > 
 <div className='flex items-center py-2'>
    <FaRegUserCircle className='text-2xl mr-[1.4vw] '/>
   <a  className='text-[1.7vw] text-blue-500 font-semibold pl-1'>All User</a> 

   </div></Link>

   <Link to='/my-order' > 
   <div className='flex items-center py-2'>
     <TbTruckDelivery className='text-2xl mr-[1.4vw] '/>

 <a className='text-[1.7vw] font-semibold text-blue-500 py-2 pl-1'>My Order</a>
 </div></Link>

{user?.role=='ADMIN'?
<Link to='/all-product'><div className='flex items-center py-2'>
     <TbTruckDelivery className='text-2xl mr-[1.4vw] '/>

 <a className='text-[1.7vw] font-semibold text-blue-500 py-2 pl-1'>All Products</a>
 </div></Link>:null}

 

 <Link to='/cart' > 
   <div className='flex items-center py-2'>
     <IoCartOutline className='text-2xl mr-[1.4vw] '/>

 <a className='text-[1.7vw] font-semibold text-blue-500 py-2 pl-1'>Cart</a>
 </div></Link>

<div className='flex items-center py-2 justify-center  '>
<div><CiLogout className='text-3xl font-semibold'/></div> 
<Link  className='text-[1.7vw] text-red-500  pl-1 font-bold' onClick={handelLogout}>Logout</Link>
</div>

    </div>
    </div>
  )
}

export default DashBoard
