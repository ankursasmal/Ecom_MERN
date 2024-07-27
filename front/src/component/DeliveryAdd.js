 import React, { useState } from 'react'
 import { RxCross2 } from "react-icons/rx";
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
function DeliveryAdd({onClose,fetchDeliveryAddress}) {
let [Useradd,setAdd]=useState({name:"",phone:"",pin:"",landMark:"",Add:""});
let navigate=useNavigate();

let name,value;
let handelchangeInput = (e) => {
  name = e.target.name;  // Use e.target.name instead of e.target.value
  value = e.target.value;
  setAdd({ ...Useradd, [name]: value }); // Update state correctly
}
//  console.log(add);

// post req for delivery address set
let UploadDeliveryAddPost = async (e) => {
  try {
    e.preventDefault();
// console.log(Useradd)
    let res = await fetch(SummeryApi.DeliveryAdd.url, {
      method: SummeryApi.DeliveryAdd.method,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(Useradd)
    });

    let data = await res.json();
    // console.log(data)
    if (data.success) {
      setAdd(data.address); // Assuming data.address contains updated address info
      toast.success('Delivery address added successfully');
      navigate('/order');
      fetchDeliveryAddress();
      onClose();

    }
  } catch (error) {
    console.error('Error adding delivery address:', error);
    toast.error('Failed to add delivery address');
  }
}


  return (
    <div className=' w-[100vw] h-[100vh] bg-slate-200  absolute top-[0vw] left-[0vw] bg-opacity-50 transition-all'>
      <div className='bg-white rounded w-[65vw] md:w-[50vw]    absolute top-[23vw] md:top-[10vw]  left-[15vw] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
            <div className='flex items-center justify-between px-2'>
          <div className='flex justify-center w-[100%]'>  <h1 className='text-2xl font-semibold mt-6 '>Upload address</h1> </div> 
            {/* props through onClose Function call */}
<button className='text-2xl' onClick={onClose}><RxCross2/></button>
    
            </div>

            <form action=""   className='mx-[10%]'>
              <div className='flex flex-col items-start  '> 
                <label htmlFor='name' className='text-2xl my-1 mt-4'>Holder Name:</label>
                <input type="text" id="name" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='name' value={Useradd.name} onChange={handelchangeInput}/>
                </div>
                <div className='flex flex-col items-start '> 
                <label htmlFor='Add' className='text-2xl my-1'>Address:</label>
                <input type="text" id="Add" placeholder='enter brendname Name' name='Add' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={Useradd.Add} onChange={handelchangeInput}/>
                </div>
 

 
                <div className='flex flex-col items-start '> 
                <label htmlFor='phone' className='text-2xl my-1'>Phone No:</label>
                <input type="text" id="phone" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='phone' value={Useradd.phone} onChange={handelchangeInput}/>
                 </div>

                      <div className='flex flex-col items-start '> 
                <label htmlFor='pin' className='text-2xl my-1'>Pin:</label>
                <input type='number' id="pin" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='pin' value={Useradd.pin} onChange={handelchangeInput}/>
                </div>

                 <div className='flex flex-col items-start '> 
                <label htmlFor='landMark' className='text-2xl my-1'>LandMark:</label>
                <textarea type="number" id="landMark" placeholder='enter product Name' className='resize-none py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='landMark' value={Useradd.landMark} onChange={handelchangeInput}></textarea>
                </div>  

                <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center mb-[6vw]' onClick={UploadDeliveryAddPost}  >Upload Addess</button> 
            </form>

   </div>    </div>
  )
}

export default DeliveryAdd
