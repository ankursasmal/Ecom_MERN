import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummeryApi from '../commonApi';
import SingleCatagoryProduct from '../component/SingleCatagoryProduct';
import indianCurrrency from '../imgConvert/IndianCurrency';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Context } from '../App';

function SpecificItemPage() {
    let paramsId=useParams();
    //    console.log(paramsId.id);
    let [SpecificProductData,setSpecificProductData]=useState({});
    let [imgurl,setImgurl]=useState('');

let ContextData=useContext(Context);
//  console.log(Context);
// take funtion and call when data add to cart
let  {fetchAddCartCount}=ContextData;
 
 

// redux toolkit data if user is auth or login or not
let user=useSelector(state=>state?.user?.user);
let navigate=useNavigate();
  //  console.log("user",user)

 
 

let handelImgurl=(val)=>{
    setImgurl(val);
}



// get specific product data by id
let fetchSpecificProductData=async()=>{
    try{
        // console.log(SummeryApi.SpecificProduct.url+'/'+`${paramsId.id}`)
        let res=await fetch(SummeryApi.SpecificProduct.url+'/'+`${paramsId.id}`,{
            method:SummeryApi.SpecificProduct.method,
            credentials:'include'
        });
        let result=await res.json();
        if(result.success){
            setSpecificProductData(result.products);
        }
  
    }
    catch{
  console.log('data not fetcth')
    }
  }
   
    // console.log("SpecificProductData",SpecificProductData)
  
  
  // for add cart id
  let obj={
    userId:user?._id || '' , 
    productname:SpecificProductData.productname,
    productId:SpecificProductData._id ,
    // productImg:SpecificProductData.productimg.slice(0,1)[0],
    category:SpecificProductData.category ,
    selling:SpecificProductData.selling ,
        
  }
    // console.log("obj",obj);
    // for click add to cart
   let AddtoCart=async()=>{
    try{
    //   console.log('obj',obj)
       if(user?._id){
       let res=await fetch(SummeryApi.cartItems.url,{
        method:SummeryApi.cartItems.method,
   headers:{
    'Content-Type':'application/json'
  },
  credentials:'include',
   body:JSON.stringify(obj)
  
      })
      // console.log('res',res)
  let result=await res.json();
  if(result.success){ 
    // cart data add then call fetchAddCartCount() whcich is call
    fetchAddCartCount();
    toast.success('product add to cart');
    // console.log(result.products);
   }
   else{
    toast.success('product already exist to cart');
  
   }
  
    }
    else{
      navigate('/login');
    }
    }
    catch(e){
      toast.error(e)
  
      console.log('cart not success',e.mesage)
  
    }
  }

   
  // for click buy button
  let AddtoCartAndBuy=async()=>{
    try{
    //   console.log('obj',obj)
       if(user?._id){
       let res=await fetch(SummeryApi.cartItems.url,{
        method:SummeryApi.cartItems.method,
   headers:{
    'Content-Type':'application/json'
  },
  credentials:'include',
   body:JSON.stringify(obj)
  
      })
      // console.log('res',res)
  let result=await res.json();
  if(result.success){ 
    // cart data add then call fetchAddCartCount() whcich is call
    fetchAddCartCount();
    toast.success('product select for Buy');
    // console.log(result.products);
    navigate('/order');

   }
   else{
    toast.success('product already exist to cart');
  
   }
  
    }
    else{
      navigate('/login');
    }
    }
    catch(e){
      toast.error(e)
  
      console.log('cart not success',e.mesage)
  
    }
  }


  useEffect(()=>{
     fetchSpecificProductData();
  },[paramsId]);
  
//   console.log(SpecificProductData)
  

  return (
    <div> 
    <div className=' mt-[12vw] md:mt-[8vw] flex items-start flex-col justify-start mx-auto w-[98vw] overflow-y-auto'>
      {/* col */}
      <div className='flex  w-[100vw] mx-auto shadow-lg p-2'>
<div className='flex w-[50%] '>
<div className='flex flex-col w-[20%] mt-3 '>
   { SpecificProductData?.productimg?.map((val,i)=>{
return(
    <>       <img key={i} src={val} alt=""  className='w-[100%] [8vh] lg:h-[11vh] hover:scale-110 transition-all m-1 -mt-1' onMouseOver={()=>handelImgurl(val)}/>
 
</>)
 
    })
}
</div>
<div className='flex items-center justify-center w-[69%]   -mt-3 p-2 shadow-xl'>
    <div className='flex items-center justify-center flex-col'>
{imgurl==''?<img src={SpecificProductData?.productimg?.slice(0,1)} alt="" className='w-[100%] h-[11vh] md:h-[42vw] border-[2px]  hover:cursor-zoom-in hover:scale-150  ' />:<img src={imgurl} alt="" className='w-[100%] h-[23vh] md:h-[42vw] border-[2px]  hover:cursor-zoom-in hover:scale-150 ' />}
<div className='flex items-center justify-around my-2'>
<button className='px-[1.2vw] py-[.5vw] text-[2vw] md:text-[1.6vw] bg-red-400 text-white rounded-lg mr-[2vw] hover:scale-110 transition-all' onClick={AddtoCart} >Add Cart</button>
<button className='px-[1.2vw] py-[.5vw] text-[2vw] md:text-[1.6vw] bg-blue-500 text-white rounded-lg hover:scale-110 transition-all' onClick={AddtoCartAndBuy}>Buy Now</button>
</div>
</div>
</div>
</div>
       {/* col */}
      <div className='flex items-start flex-col justify-start w-[50%] mx-auto  pl-[2vw]  mr-[2vw]'>
  <a className='text-[3.4vw] md:text-[3vw] font-semibold line-clamp-3'>{SpecificProductData.description  } </a>
  <a className='text-[2.2vw] md:text-[2vw] font-semibold  text-blue-500'>Product:{SpecificProductData.productname  } </a>

  <a className='text-[2.4vw] md:text-[2vw] font-normal my-[1.2vw] '><span className='text-[2.4vw] md:text-[2vw] font-bold '>Brendname:</span> {SpecificProductData.brendname  } </a>
  <a className='text-[2.2vw] md:text-[2vw] font-normal  line-through'><span className='text-[2.4vw] md:text-[2vw] font-bold '>Price:</span>{indianCurrrency(SpecificProductData.price)  } </a>
  <a className='text-[2.2vw] md:text-[2vw] font-semibold my-[1.2vw] text-blue-500'><span className='text-[2.4vw] md:text-[2vw] font-bold text-red-400 '>Selling Price:</span>{indianCurrrency(SpecificProductData.selling)  } </a>
  <a className='text-[3vw] md:text-[2.6vw] font-bold mt-[2.3vw] text-red-500 ' > Frequently bought together  </a>
 <div className='w-[98%] overflow-hidden'>    
  <SingleCatagoryProduct catagory={SpecificProductData?.category} Title={SpecificProductData?.category}  />  
</div>
  </div>
  </div>
  </div>
  <div className='mt-[3vw] mx-[2vw]'>
  <SingleCatagoryProduct Title={`Top's ${SpecificProductData?.category}  Brand`} catagory={SpecificProductData?.category}   />  
</div>
</div>
  )
}

export default SpecificItemPage
