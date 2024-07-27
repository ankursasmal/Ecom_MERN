import React, { useEffect, useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import indianCurrrency from '../imgConvert/IndianCurrency';

function AllProductCard({allProduct,fetchAllData}) {
 let [allProductData,setallProductData]=useState(allProduct);

// specific product edit 
let [specificId,setspecificId]=useState('')
let [ShowEditPage,setShowEditPage]=useState(false);

// onload all product data set
useEffect(()=>{
setallProductData(allProduct);
},[allProduct])
// console.log(allProduct);


 let handelEditDetail=(id)=>{
setspecificId(id);
setShowEditPage(true);
}

  return (
    <div>
    <div className='flex items-center justify-center flex-wrap w-[100%]  gap-3 pt-3 px-4 '>
    {allProductData?.map((val,i)=>{
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
    {ShowEditPage && <AdminEditProduct specificId={specificId} onClose={()=>setShowEditPage(false)} fetchAllData={fetchAllData} />}
    </div>
  )
}

export default AllProductCard
