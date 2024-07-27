import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { setUserDetails } from '../store/userSlice';
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { CiLogout } from "react-icons/ci";

function GeneralAdmin({onClose}) {
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
     <div className='hidden lg:block  '> 
   <div className='h-[94vh] fixed top-[10vw] md:top-[6vw]  left-0 bg-[#edfcf5] ' > 
    <div className='flex items-center justify-between'>
      <a className='text-[2vw] text-red-500  ml-[1vw] font-bold'>User</a>
          <div className='flex justify-end mr-[.5vw]  ' onClick={onClose}><RxCross2 className='text-3xl'/></div>
</div> 
    <div className=' w-[15vw]'>

      {user?
     <div   className='flex justify-center flex-col mb-3'>
      <a className='font-semibold text-[2.3vw] text-center text-blue-400'>{user.name}</a>
      <a className='font-semibold text-[2.3vw] text-center'>{user.role}</a>
      </div>
      :      <a className='font-semibold text-[2.3vw]'>User</a>
}

 <div className='flex justify-start items-start flex-col pl-3'>
<Link to='/all-user' className='text-[1.7vw] text-blue-500 py-2 pl-1'>All User</Link>
 <Link to='/my-order' className='text-[1.7vw] text-blue-500 py-2 pl-1'>My Order</Link>
<div className='flex items-center py-2 justify-center fixed bottom-3 left-3'>
<div>
  <CiLogout className='text-3xl font-semibold ml-2'/></div> 
<Link  className='text-[1.7vw] text-red-500  pl-2 ' onClick={handelLogout}>Logout</Link>
</div>

</div> 

    </div>
    </div>
    </div>
    
   )
}
 
export default GeneralAdmin
