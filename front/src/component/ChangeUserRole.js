import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function ChangeUserRole({Show,id}) {
  // direct id show use ar poriborta useEffect under use koro
     let [roleChange,setroleChange]=useState('');
let [show,setShow]=useState(Show);
let [EditId,setEditID]=useState(id);
let [EditedUser,setEditedUser]=useState({});
//  console.log(show,EditId);

// to check if loginuser  Admin or not if admin then can upata another
let PresentLOginUser=useSelector(state => state.user.user);
// console.log(PresentLOginUser)
 
let onClose =()=>{
  if(!show){
    setShow(true);
  }
  else{
    setShow(false);
  }
}
// props a value use stata rakhla ta useEffect und set korta hoba
useEffect(()=>{
  setEditID(id);
  setShow(Show);
  },[Show, id])
  
// console.log(EditId)

// getUser Which is Edit
let GetuseRDetailWhichEdit=async()=>{
  try{
    // console.log(EditId)
    let res=await fetch(`http://localhost:3000/specific-user/${EditId}`,{
      method:'GET',
      credentials:'include'
    });
    let getdata=await res.json();
    if(getdata.success){
setEditedUser(getdata.data);
    }
    else{
      throw new Error('data not fetch')
    }

  }
  catch(e){
console.log('data not come for edit',e.message)
  }
}
// dependency arr EditId because all time click new id genearte so fetch continue
useEffect(()=>{
  GetuseRDetailWhichEdit();
},[EditId])



// update user info if user role is admin
const updatauseRoel=async()=>{
try{
  // reduxtool kit thaka login user detail chack is role =Admin thhen operatin preform
  if(PresentLOginUser.role==='ADMIN'){
    console.log('ankur')
  let res=await fetch(`http://localhost:3000/user-update/${EditId}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json'
   },
   body:JSON.stringify({
name:EditedUser.name,
email:EditedUser.email,
role:roleChange
   })
   });
   let data=await res.json();
   if(data.success){
    console.log('update successfull');
    toast.success('update successfull')
   }
  }
  else{
    toast.error('You are not Authorize to change user detail')
    console.log('You are not Authorize to change user detail')
    throw new Error('Login User Not Authorize');
    }

}
catch(e){
  console.log('You are not Authorize to change user detail',e.message)

}
}
 
  return (
    <div className='flex w-full justify-center items-center mt-[4vw]'  >
     {show?  
      <>
     { Object.values(EditedUser).map((val)=>{
      return (
<div key={val._id} className='flex flex-col items-start shadow-lg p-4 w-[50vw] md:w-[20vw] '>
        <button className='self-end pb-[.5vw] text-3xl' onClick={onClose}>
            <RxCross2/>
        </button>
      <h1 className=' font-semibold mb-1.5 text-center self-center text-[2vw]'>Change user role</h1>
              <a className='text-[1.5vw]'>Name:{val.name}</a>
      <a className='my-1 text-[1.5vw]'>Email:{val.email}</a>
      <div className='flex justify-between items-center pb-[4vw] w-[100%]'>
      <label htmlFor="" className='text-[1.5vw]'>Role:</label>
<select name="" id="" onChange={(e)=>setroleChange(e.target.value)} value={roleChange || val.role}  className='text-[1.2vw]'>
    <option value="ADMIN">ADMIN</option>
    <option value="GENERAL">GENERAL</option>
</select>
 </div>
      <button  className='rounded-full bg-blue-400 text-white px-4 py-1 text-center self-center' onClick={updatauseRoel}>Change Role</button>
    </div> )
     })
}
  </>
  
 :null}
    </div>
  )
}

export default ChangeUserRole
