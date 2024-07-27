 
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
 import indianCurrrency from '../imgConvert/IndianCurrency';
import { Context } from '../App';
import { useSelector } from 'react-redux';
 
function SearchPage() {
// for recive query
const query = useLocation();
//  console.log(query.search) //ans ?q=val

 // show loading
let [loading,setLoading]=useState(true);
let loadingArrray=new Array(40).fill(null);

 
  
// console.log(params.catagory)
 let [catagoryName,setcatagoryName]=useState(query.search);
  // console.log(catagoryName);
 
   let [data,setData]=useState([]);



   let [cartId,setCardId]=useState('');

// redux toolkit data if user is auth or login or not
let user=useSelector(state=>state?.user?.user);
let navigate=useNavigate();
  //  console.log("user",user)
let totalItem=data.length;
// console.log(totalItem)

// for AddCart count funtion update call in App.js
let ContextData=useContext(Context);
//  console.log(Context);
// take funtion and call when data add to cart
let  {fetchAddCartCount}=ContextData;

 // store setSpecificProductData
 let [SpecificProductData,setSpecificProductData]=useState([]);
 let fetchCatagoryProduct=async()=>{
  try{
    // console.log(SummeryApi.CatagoryWiseProduct.url+'/'+`${params.catagory}`)
// fetch under (backend query,) fronten =>(?q=value link ara and main route a pass annd paga recive)
let res=await fetch(SummeryApi.SearchItems.url+`${query.search}`,{
method:SummeryApi.SearchItems.method,
credentials:'include',

})

let result=await res.json();
// console.log(result);
if(result.success){
setData(result.items);
setLoading(false);
// toast.success('data fetch success');
}
  }
  catch(e){
    toast.error('data not fetch ');

  }
}

useEffect(()=>{
fetchCatagoryProduct(); 
},[query])
  

 
 


// cart Section

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
 
  // console.log("SpecificProductData",SpecificProductData)


 
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
    <div className=' mt-[13vw] md:mt-[8vw] flex items-start flex-col justify-start mx-auto w-[100vw] overflow-y-auto'>
        <div className=' flex justify-start pl-[7vw] my-2 w-[100%]'><a className='text-3xl font-bold mb-2'>Total Search Items:{" "}{totalItem}</a></div>

    {data?(loading?<div className='flex items-center justify-center flex-wrap w-[98vw]   animate-pulse '>
        {loadingArrray?.map((val,i)=>{
            return(
              <div key={i} className='flex   items-center   p-2     m-3 shadow-lg    bg-slate-200'>
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
    <div className='flex scrollber items-center justify-center flex-wrap  w-[98vw] shadow-2xl  '>
         {data?.map((val,i)=>{
            return(
              <div key={i} className='flex flex-col  items-center   p-2     m-3 shadow-lg    bg-slate-200  '>
              <div className='w-[200px] h-[230px] hover:scale-125 transition-all ' > 
              <Link to={`/same-catagoryItems/${val.category}`}> <img src={val?.productimg[0]} alt="" className='w-[200px] h-[230px] '   /></Link>
              </div>
              <div className='w-[200px] h-[150px] flex flex-col justify-start items-start pl-3'> 
              <a className='text-2xl font-bold py-3 line-clamp-1'>{val?.productname}</a>
              <a className='  line-through'>{indianCurrrency(val?.price)}</a>
                  <a className=' text-red-500  pb-2'>{indianCurrrency(val?.selling)}</a>
                  <button className='rounded-full px-3 py-1 w-[90%] bg-red-400 text-white hover:scale-105 transition-all'  onClick={()=>CartItemAdd(val?._id)}>Add Cart</button>
                </div>
                    </div>
          )
           })}
        </div>):
        <div className='flex items-center justify-center flex-wrap w-[100vw] animate-pulse  '>
         
         {loadingArrray?.map((val,i)=>{
            return(
              <div key={i} className='flex   items-center   p-2     m-3 shadow-lg    bg-slate-200'>
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


export default SearchPage
