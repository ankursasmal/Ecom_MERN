import React, { useEffect, useState } from 'react'
import UploadProduct from '../component/UploadProduct';
import { toast } from 'react-toastify';
import SummeryApi from '../commonApi';
import AllProductCard from '../component/AllProductCard';
import { useSelector } from 'react-redux';
 
function AllProduct() {
  let [Loading,setLoading]=useState(true);
  let loadingArray=new Array(30).fill(null);
    // for hiden and block
  let [ProductUplode,setProductUpload]=useState(false);
 let user=useSelector( state=>state?.user?.user);
  // for dispaly product list
  let [allProduct,setAllproduct]=useState([]);

let DisplayAllProduct=async()=>{
  try{
    console.log(user._id)
    let res=await fetch(SummeryApi.PoductDisplay.url+'/'+`${user._id}`,{
      method:SummeryApi.PoductDisplay.method,
      credentials:'include'
    })
    let displayData=await res.json();
    if(displayData.success){
      setAllproduct(displayData.data);
      setLoading(false);
      // toast.success('data get succesfuly')
    }
    else{
      throw new Error('data not fetch')
    }

  }
  catch(e){
    toast.error('product data not come');
    console.log('data not come',e.message)
  }
}
// console.log(allProduct );

useEffect(()=>{
  DisplayAllProduct();
},[])


// for deit img or product id
// let handelEditDetail=(id)=>{
//   setspecificId(id);
// setShowEditPage(true);
// }



  return (
    <div className='mt-[13vw] md:mt-[9vw] ml-0 md:ml-[17vw] flex flex-col mr-4' >
     <div className='p-2 shadow-lg flex  items-center  justify-between'>
       <a className='text-[3.2] md:text-[2.2vw]  font-semibold'>All Product</a>
     <button className='text-[3.2] md:text-[2.2vw] rounded-3xl px-3 py-1 font-semibold bg-blue-400 text-white' onClick={()=>setProductUpload(ProductUplode==true?false:true)}>Upload Product</button>
    </div>

{/* dispaly all products  */}
{ allProduct?(Loading?
<div className='flex items-center justify-center flex-wrap w-[100%] gap-3 pt-3 px-4 '>
    {loadingArray?.map((val,i)=>{
      return(
        <div key={i} className='flex flex-col items-center justify-center shadow-lg bg-slate-200 w-[200px] h-[200px] m-3'>
         </div>
      )
    })}
    
    </div>
:
<AllProductCard allProduct={allProduct} fetchAllData={DisplayAllProduct} />):
<div className='flex items-center justify-center flex-wrap w-[100%] gap-3 pt-3 px-4 '>
    {loadingArray?.map((val,i)=>{
      return(
        <div key={i} className='flex flex-col items-center justify-center shadow-lg bg-slate-200 w-[200px] h-[200px] m-3'>
         </div>
      )
    })}
    
    </div>

}
 

    {/* upload produce component */}
{
  // 
  ProductUplode && <UploadProduct onClose={()=>{setProductUpload(false)}}   fetchData={DisplayAllProduct}/>
}
     </div>
  )
}

export default AllProduct
