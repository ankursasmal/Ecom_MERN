import React, { useState ,useEffect} from 'react'
 import { toast } from 'react-toastify';
import SummeryApi from '../commonApi';
import '../App.css'
import { Link } from 'react-router-dom';

function CatagoryList() {
    let [catagoryData,setcatagoryData]=useState([]);
let [loading,setLoading]=useState(true);
    let fetchCatgoryWiseData=async()=>{
      try{
        let res=await fetch(SummeryApi.GetCatagoryWiseData.url,{
          method:SummeryApi.GetCatagoryWiseData.method,
          credentials:'include'
        })
        let data=await res.json();
        setLoading(false)
    if(data.success){
       setcatagoryData(data.CatagoryData);
      // toast.success('data get success');
    }
    
      }
      catch(e){
        toast.error('data not get ',e.message);
    
      }
    }
    // console.log(catagoryData)
    
    useEffect(()=>{
      fetchCatgoryWiseData();
    },[])
// create new array
    let loadinArray=new Array(12).fill(null);

    
  return (
    <div>
      {
       catagoryData?( loading?
        <div className='scrollber cursor-pointer flex items-center  overflow-x-auto    w-[100vw]  '>
{ 
loadinArray?.map((val,i)=>{
return (
  <div key={i} className=' p-2  hover:scale-110 transition-all  m-3'>
    <div  className='h-20 w-20 rounded-full  object-scale-down bg-slate-200'></div>
     </div>
)
})
}
</div>
          :
              <div className='scrollber cursor-pointer flex items-center  overflow-x-auto -z-10 w-[100vw]  '>

     {   catagoryData?.map((val,i)=>{
return(
<div  key={i} >
<Link to={`/same-catagoryItems/${val?.category}`} ><div  className='flex flex-col items-center   gap-4 justify-between hover:scale-110 transition-all m-3'>
    <img src={val?.productimg[0]} alt=""  className='h-20 w-20 rounded-full  object-scale-down'/>
    <a className='text-2xl  '>{val?.category}</a>
    </div></Link>
</div>
)
        })
      }
    </div>

    ):
    <div className='scrollber cursor-pointer flex items-center  overflow-x-auto -z-10 w-[100vw]  '>
    { 
    loadinArray?.map((val,i)=>{
    return (
      <div key={i}  className=' p-2  hover:scale-110 transition-all m-3'>
        <div  className='h-20 w-20 rounded-full  object-scale-down bg-slate-200'></div>
         </div>
    )
    })
    }
    </div>
           
    }
    </div>
   )
}

export default CatagoryList
