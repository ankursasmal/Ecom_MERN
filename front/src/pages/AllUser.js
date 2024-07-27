import React, { useEffect, useState } from 'react'
import SummeryApi from '../commonApi';
import '../App.css'
import monent from 'moment'
import { FaPen } from "react-icons/fa6";
import ChangeUserRole from '../component/ChangeUserRole';

function AllUser() {
  let [show,setShow]=useState(true);
  let [Id,setId]=useState();

  let [user,setuser]=useState([]);
  let authuser=async()=>{
    try{
      let res=await fetch(SummeryApi.AuthUser.url,{
        method:SummeryApi.AuthUser.method,
        credentials:'include'
      });
      let data=await res.json();
      if(data.success){
 setuser(data.users);
      }
    }
    catch(e){
console.log('error',e.message)
    }
  }
  useEffect(()=>{
    authuser();
  },[])
  
  // id pass to props 
  let hndelPassIdForEdit=(id)=>{
setId(id);
  }
 
  return (
    <div className=' mt-[14vw] md:mt-[9vw] ml-0  ' >
       <table className='user '>
        <thead className='py-2'>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
<th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
           user.map((val, i) => {
            return(
            <tr key={i} >
              <td >{i + 1}</td>
              <td className='text-[1.6vw] md:[text-1.7vw]'>{val?.name}</td>
              <td className='text-[1.6vw] md:[text-1.7vw]'>{val?.email}</td>
              <td className='text-[1.6vw] md:[text-1.7vw]'>{val?.role}</td>
              <td className='text-[1.6vw] md:[text-1.7vw]'>{monent(val?.date).format('LL')}</td> 
              <td className='bg-blue-500 text-gray-500 hover:text-red-500 hover:bg-white w-[70%] md:w-[100%] h-[100%] rounded-full text-[1.6vw] '  onClick={()=>hndelPassIdForEdit(val._id)}><FaPen/></td> 
            </tr>
            )
})
          }
        </tbody>
      </table>

      <ChangeUserRole Show={show} id={Id}/>
     </div>
  )
}

export default AllUser
