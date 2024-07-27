import React, { useContext, useEffect, useRef, useState } from 'react'
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import indianCurrrency from '../imgConvert/IndianCurrency';
import '../App.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import {useDispatch, useSelector} from 'react-redux'
import {addToCart} from '../store/userSlice'
import { Context } from '../App';



 function SingleCatagoryProduct({Title,catagory}) {
// for AddCart count funtion update call in App.js
let ContextData=useContext(Context);
//  console.log(Context);
// take funtion and call when data add to cart
let  {fetchAddCartCount}=ContextData;
 
  let scrollLeftRight = useRef(null);
 let [cartId,setCardId]=useState('');
 // redux toolkit data if user is auth or login or not
  let user=useSelector(state=>state?.user?.user);
let navigate=useNavigate();
  //  console.log("user",user)

 // store setSpecificProductData
let [SpecificProductData,setSpecificProductData]=useState([]);

     let [data,setData]=useState([]);
// show loading
let [loading,setLoading]=useState(true);
let loadingArrray=new Array(10).fill(null);

 

let singleCatgoryProduct=async()=>{
         try{
          // console.log(SummeryApi.CatagoryWiseProduct.url+'/'+`${params.catagory}`)
    
    // fetch under (backend params,) fronten =>(params link ara and main route a pass annd paga recive)
    let res=await fetch(SummeryApi.CatagoryWiseProduct.url+'/'+`${catagory}`,{
      method:SummeryApi.CatagoryWiseProduct.method,
      credentials:'include',
      
    })
    
    let result=await res.json();
    // console.log(result);
    if(result.success){
        setLoading(false);
    setData(result.products);
    // toast.success('data fetch success');
    }
        }
        catch(e){
          toast.error('data not fetch ');
    
        }
      }
        // console.log(data)

useEffect(()=>{
    singleCatgoryProduct();
},[catagory])

// scroll 
let rightScroll = () => {
     scrollLeftRight.current.scrollLeft -= 800;
  
};

let leftScroll = () => {
     scrollLeftRight.current.scrollLeft += 800;
  
};
 

// get specific product data by id
let fetchSpecificProductData=async()=>{
  try{
      // console.log(SummeryApi.SpecificProduct.url+'/'+`${paramsId.id}`)
      let res=await fetch(SummeryApi.SpecificProduct.url+'/'+`${cartId}`,{
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
 
  //  console.log("SpecificProductData",SpecificProductData)



  // console.log("obj",obj);
 let AddtoCart=async()=>{
  try{
    //  console.log('obj',obj)
     if(user?._id){
     let res=await fetch(SummeryApi.cartItems.url,{
      method:SummeryApi.cartItems.method,
 headers:{
  'Content-Type':'application/json'
},
credentials:'include',
 body:JSON.stringify(SpecificProductData)

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

useEffect(()=>{
   fetchSpecificProductData();

},[cartId]);


// add to cart
let CartItemAdd =(id)=>{
  setCardId(id);
  AddtoCart();

}
  return (
    <div className='mt-3 flex items-start flex-col justify-start mx-auto w-[100vw]'>
<a className='text-2xl font-bold mb-2'>{Title}</a>

{data?(loading?<div className='flex items-center overflow-x-auto w-[98vw]  animate-pulse  '>
    {/* for structure */}
    {loadingArrray?.map((val,i)=>{
        return(
          <div key={i} className='flex   items-center   p-2   m-3 shadow-lg    bg-slate-200'>
          <div className='w-[200px] h-[230px] hover:scale-125 transition-all ' > 
<div  className='w-[200px] h-[230px]  '   ></div> 
          </div>
          <div className='w-[200px] h-[200px] flex flex-col justify-start items-start pl-3'> 
          <div className='text-2xl font-bold py-3 line-clamp-1 w-[80%]  bg-slate-300'> </div>
          <div className='  line-through w-[80%] my-4 py-3  bg-slate-300'></div>
              <div className='  mb-2 w-[60%] bg-slate-300 py-3'> </div>
              <button className='rounded-full py-3 mt-4  text-white hover:scale-105  bg-slate-300 transition-all'></button>
            </div>
                </div>)
    })}
   </div>: 
<div className='flex scrollber items-center  overflow-scroll  w-[98vw] shadow-2xl relative '  ref={scrollLeftRight}>
     {data?.map((val,i)=>{
        return(
      <div key={i} className='flex   items-center   p-2     m-3 shadow-lg    bg-slate-200  '>
<div className='w-[200px] h-[230px] hover:scale-125 transition-all ' > 
<Link to={`/same-catagoryItems/${val.category}`}> <img src={val?.productimg[0]} alt="" className='w-[200px] h-[230px] '   /></Link>
</div>
<div className='w-[200px] h-[200px] flex flex-col justify-start items-start pl-3'> 
<a className='text-2xl font-bold py-3 line-clamp-1'>{val?.productname}</a>
<a className='  line-through'>{indianCurrrency(val?.price)}</a>
    <a className=' text-red-500  pb-2'>{indianCurrrency(val?.selling)}</a>
    <button className='rounded-full px-3 py-1 bg-red-400 text-white hover:scale-105 transition-all' onClick={()=>CartItemAdd(val._id)}>Add Cart</button>
  </div>
      </div>
      )
       })}
<button className='sticky top-[6rem] md:top-[7.5rem] right-4 text-[4vw] w-10 h-10 rounded-full bg-white flex items-center justify-center'  onClick={leftScroll}><MdKeyboardArrowRight className='text-[5vw]'/></button>
<button className='sticky top-[6rem] md:top-[7.5rem] right-[94vw] text-[4vw]  w-10 h-10  rounded-full bg-white flex items-center justify-center' onClick={rightScroll} ><MdKeyboardArrowLeft className='text-[5vw]'/></button>
   </div>):
    <div className='flex items-center overflow-x-auto w-[100vw] animate-pulse  '>
     
     {loadingArrray?.map((val,i)=>{
          {/* for structure */}

        return(
          <div key={i} className='flex  items-center   p-2     m-3 shadow-lg    bg-slate-200'>
          <div className='w-[200px] h-[230px] hover:scale-125 transition-all ' > 
<div  className='w-[200px] h-[230px]  '   ></div> 
          </div>
          <div className='w-[200px] h-[200px] flex flex-col justify-start items-start pl-3'> 
          <div className='text-2xl font-bold py-3 line-clamp-1 w-[80%]  bg-slate-300'> </div>
          <div className='  line-through w-[80%] my-4 py-3  bg-slate-300'></div>
              <div className='  mb-2 w-[60%] bg-slate-300 py-3'> </div>
              <button className='rounded-full py-3 mt-4  text-white hover:scale-105  bg-slate-300 transition-all'></button>
            </div>
                </div>)
    })}
    </div>
}
</div>
  )
}

export default SingleCatagoryProduct
