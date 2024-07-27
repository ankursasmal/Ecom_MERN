import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { MdEdit } from "react-icons/md";
 import AdminEditProduct from './AdminEditProduct';
import indianCurrrency from '../imgConvert/IndianCurrency';

function CatagoryWiseAllProductShowHome() {
  // direct we get value of route below ling
  let params=useParams();
// console.log(params.catagory)
 let [catagoryName,setcatagoryName]=useState(params.category);
  // console.log(catagoryName);

let [specificId,setspecificId]=useState('')
let [ShowEditPage,setShowEditPage]=useState(false);

   let [data,setData]=useState([]);

  let fetchCatagoryProduct=async()=>{
    try{
      // console.log(SummeryApi.CatagoryWiseProduct.url+'/'+`${params.catagory}`)

// fetch under (backend params,) fronten =>(params link ara and main route a pass annd paga recive)
let res=await fetch(SummeryApi.CatagoryWiseProduct.url+'/'+`${catagoryName}`,{
  method:SummeryApi.CatagoryWiseProduct.method,
  credentials:'include',
  
})

let result=await res.json();
console.log(result);
if(result.success){
setData(result.products);
toast.success('data fetch success');
}
    }
    catch(e){
      toast.error('data not fetch ');

    }
  }

useEffect(()=>{
fetchCatagoryProduct(); 
  },[])

//  console.log(data)


let handelEditDetail=(id)=>{
  setspecificId(id);
  setShowEditPage(true);
  }

  return (
    <div className='mt-[90px] w-[100vw]'>
     <div className='w-[100vw] flex justify-center'> <a className='  text-3xl font-bold '>{catagoryName}</a></div>  
     <div className='flex items-center justify-center flex-wrap w-[100%] gap-3 pt-3 px-4 '>
    {data?.map((val,i)=>{
      return(
        <div key={i} className='flex flex-col items-center justify-center shadow-lg bg-slate-200 m-3'>
    <img src={val.productimg[0]} alt="" className='w-[200px] h-[200px]' />
    <a className='text-2xl font-bold py-2'>{val.productname}</a>
    {/*  indianCurrrency is function convert inr */}
    <a className='text-2xl font-bold py-2'>{indianCurrrency(val.price)}</a>
    <div className='h-6 w-6 flex items-center justify-center rounded-full bg-red-400 cursor-pointer text-white hover:bg-green-500 hover:text-red-500 self-end mr-1'  onClick={()=>handelEditDetail(val._id)}><MdEdit/></div>
        </div>
      )
    })}
    
    </div>
    {/* if i pass val direct no requuire to get request <AdminEditProduct data={val} /> page only pas */}
    {ShowEditPage && <AdminEditProduct specificId={specificId} onClose={()=>setShowEditPage(false)} fetchCatagoryProduct={fetchCatagoryProduct} />}
    </div>
   )
}

export default CatagoryWiseAllProductShowHome
