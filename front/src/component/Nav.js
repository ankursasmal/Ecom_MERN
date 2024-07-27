import React, { useContext, useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import AdminPanal from '../pages/AdminPanal';
 import AllProduct from '../pages/AllProduct'
import {Context} from '../App.js'
import home from '../assect/home.png'
import { RiStoreFill } from "react-icons/ri";
import GeneralAdmin from '../pages/GeneralAdmin.js';
import DashBoard from './DashBoard.js';

function Nav() {
let navigete=useNavigate();
let ContextData=useContext(Context);
// console.log(ContextData);
let {count}=ContextData;
// console.log(count) 

// user data from reduxtool kit userSlice.js
let user=useSelector(state=>state?.user);
 // console.log('cartNo',cartNo);
// console.log('redux data using useSleccctor come frontned (destructer it)',user.user)
user=user?.user;

// after logout cookie clear from application and also require to delet user detail from
// drdux stroe 
let dispatch=useDispatch();

// show addmi on click
let [show,setshow]=useState(false);
let [searchValue,setsearchValue]=useState("");
 
// logout
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
 


// for search operation
let handelSearch=(e)=>{
     setsearchValue(e.target.value);
if(searchValue!==''){
    navigete(`/searchItems?q=${searchValue}`)
}
}

// console.log(searchValue)
   return (
    <header className='h-[11vw] md:h-[6vw] fixed top-0 left-0   w-[100%] bg-slate-200 shadow-lg z-50'>
         <div className='flex items-center justify-between px-[1vw]  md:px-[3vw]   mx-auto  '>
<Link to='/' className="font-bold text-[8vw] md:text-[4.2vw] text-[#2a4d68] font-['Open_Sans']">Ecom </Link>
<form className='hidden lg:flex items-center justify-between   max-w-md   ' >
    <input  className='w-[30vw] outline-none border-none rounded-s-full py-[.3vw] pl-1  focus-within:shadow-md' type="search" placeholder='search producets '  value={searchValue} onChange={handelSearch}/>

    <button type='submit' onClick={()=>setsearchValue(searchValue)} className='h-full text-lg bg-blue-500 min-w-[50px]  flex items-center justify-center rounded-e-full px-1 py-[.5vw] text-white' >
    <IoSearchOutline />
</button>
</form>
<div className='flex items-center  justify-between gap-2 md:gap-6'> 
<div className='text-3xl  '>
   
   {user?.name?<a onClick={()=>{setshow(show==true?false:true)}} className='cursor-pointer flex justify-center items-center w-11 h-11 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-[2vw] xl:h-[2vw] rounded-full bg-[#4687f0] text-white font-semibold' >{user.name[0].toUpperCase()}</a> :<FaRegUserCircle />}

</div>
{user?.role=='ADMIN'?(show?<div><AdminPanal onClose={()=>setshow(false)}/>   </div>:null):null}
{user?.role=='GENERAL'?(show?<div><GeneralAdmin onClose={()=>setshow(false)}/>   </div>:null):null}
{user?.name?(show?<div ><DashBoard onClose={()=>setshow(false)}/>   </div>:null):null}

{count!==0 && user?.name?(
    <>
<Link to='/cart'> <div className='relative   '>
    <IoCartOutline className='text-4xl   '/>
    <div className='bg-green-500 text-white w-5 h-5 rounded-full  p-1 flex items-center justify-center absolute top-0  left-4'>
        <a>{count}</a>

    </div>
</div></Link>
</>
)
:
(
<> <Link to='/'> <div className='relative   '>
    <IoCartOutline className='text-4xl   '/>
    <div className='bg-green-500 text-white w-5 h-5 rounded-full  p-1 flex items-center justify-center absolute top-0  left-4'>
        <a>{0}</a>

    </div>
</div></Link> 
</>
)
}

 {user?.name?<Link to='/seller'> <div className='flex items-center justify-center'>
    <div  className='text-3xl'><RiStoreFill/>
    </div> 
<a className='hidden md:block mr-[1vw] text-blue-600'>Become A Seller</a></div></Link>:null}

<div>
    {user?._id?<button className='px-3 mr-2 md:mr-3  py-1 rounded-full   text-white hover:bg-red-700' onClick={handelLogout} style={{backgroundColor:'#405ceb'}}>Logout</button>
 :<Link to='/signup'> <button className='px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700'>SignUp</button> </Link>
          } 
     

 </div>
     </div>

   
        </div>
      </header>
  )
}

export default Nav
