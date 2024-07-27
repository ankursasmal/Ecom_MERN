 
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
 import indianCurrrency from '../imgConvert/IndianCurrency';
import { Context } from '../App';
import { useSelector } from 'react-redux';
 
function ClickMultipluSameProduct() {
 // show loading
let [loading,setLoading]=useState(true);
let loadingArrray=new Array(40).fill(null);

 
  // direct we get value of route below ling
  let params=useParams();
// console.log(params.catagory)
 let [catagoryName,setcatagoryName]=useState(params.category);
  // console.log(catagoryName);
 
   let [data,setData]=useState([]);

   let [cartId,setCardId]=useState('');

// redux toolkit data if user is auth or login or not
let user=useSelector(state=>state?.user?.user);
let navigate=useNavigate();
  //  console.log("user",user)


// for AddCart count funtion update call in App.js
let ContextData=useContext(Context);
//  console.log(Context);
// take funtion and call when data add to cart
let  {fetchAddCartCount}=ContextData;

// for filter
let [catagoryItems,setcatagoryItems]=useState('');
let [priceCatagory,setpriceCatagory]=useState(0);

 // store setSpecificProductData
 let [SpecificProductData,setSpecificProductData]=useState([]);
 let fetchCatagoryProduct=async()=>{
  try{
    // console.log(SummeryApi.CatagoryWiseProduct.url+'/'+`${params.catagory}`)
// fetch under (backend params,) fronten =>(params link ara and main route a pass annd paga recive)
let res=await fetch(SummeryApi.CatagoryWiseProduct.url+'/'+`${catagoryItems || catagoryName}`,{
method:SummeryApi.CatagoryWiseProduct.method,
credentials:'include',

})

let result=await res.json();
// console.log(result);
if(result.success){
  if(priceCatagory==1){
    setData(result.lowToHigh);
  }
  if(priceCatagory==-1){
    setData(result.HigtToLow);
  }
  else{
setData(result.products);
  }
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
 },[])
 useEffect(()=>{
  fetchCatagoryProduct(); 
   },[catagoryItems,priceCatagory])  

 
 


// cart Section

// get specific product data by id
let fetchSpecificProductData=async()=>{
  try{
      // console.log(SummeryApi.SpecificProduct.url+'/'+`${paramsId.id}`)
      let res=await fetch(SummeryApi.SpecificProduct.url+'/'+`${cartId }`,{
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

// for filter area wise
let handelChangeCatagory=(e)=>{
setcatagoryItems(e.target.value)
}
// console.log(catagoryItems);

// according price catagory
let handelPriceCatagory=(e)=>{
  setpriceCatagory(Number.parseInt(e.target.value));
}
// console.log(priceCatagory)

  return (
    <div className='grid grid-cols-12 gap-2 mt-[7vw] w-[100vw] mx-auto'>
     <div className='col-span-4 md:col-span-2   mt-[25px] mx-3 '>
<div className='flex flex-col justify-start items-start p-3 shadow-xl   '>
<a className=' text-[3.8vw] md:text-[2.2vw] font-semibold my-3'>SORT BY</a>
<div className='w-[100%] h-[1px] bg-black mb-2'></div>
 
<div className='flex items-center'> 
<input type="radio" id="Price" name="fav_language" value="1"  onChange={handelPriceCatagory}/>

<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="Price">Price- Low to High</label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="High" name="fav_language" value="-1"  onChange={handelPriceCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="High">Price-High to Low</label>
</div>
 
<a className=' text-[3.8vw] md:text-[2.2vw] font-semibold mt-3'>CATEGORY</a>
<div className='w-[100%] h-[1px] bg-black mt-3 mb-2'></div>

<div className='flex items-center'> 
<input type="radio" id="airpodes" name="fav_language"  value="airpodes" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="airpodes">Airpodes</label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="camera" name="fav_language"  value="camera" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="camera"> Camera</label>
</div>
<div className='flex items-center'> 
<input type="radio" id="earphones" name="fav_language"  value="earphones" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="earphones"> Earphones</label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="mobiles" name="fav_language"  value="mobiles" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="mobiles">Mobiles </label>
</div>
<div className='flex items-center'> 
<input type="radio" id="printers" name="fav_language"  value="printers" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="printers">Printers </label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="processor" name="fav_language"  value="processor" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="processor">Processor </label>
</div>
<div className='flex items-center'> 
<input type="radio" id="refrigerator" name="fav_language"  value="refrigerator" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="refrigerator"> Refrigerator</label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="speakers" name="fav_language"  value="speakers" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="speakers">Speakers </label>
</div>
<div className='flex items-center'> 
<input type="radio" id="trimmers" name="fav_language"  value="trimmers" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="trimmers">Trimmers</label>
</div>
<div className='flex items-center my-2'> 
<input type="radio" id="televisions" name="fav_language"  value="televisions" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="televisions">Televisions </label>
</div>
<div className='flex items-center mb-3'> 
<input type="radio" id="watches" name="fav_language"  value="watches" onChange={handelChangeCatagory}/>
<label className='ml-2    text-[2.5vw]    md:text-[1.4vw] ' htmlFor="watches">Watches</label>
</div>





</div>
    </div>
     <div className=' col-span-8  md:col-span-10 '>
 <div className='flex items-start flex-col justify-start mt-10  w-[100%] '>
     
    {data?(loading?<div className='flex items-center justify-center flex-wrap   animate-pulse '>
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
    <div className='flex scrollber items-center justify-center flex-wrap   shadow-2xl  '>
         {data?.map((val,i)=>{
            return(
              <div key={i} className='flex flex-col  items-center   p-2     m-3 shadow-lg    bg-slate-200  '>
              <div className='w-[200px] h-[230px] hover:scale-125 transition-all ' > 
    <Link to={`/specific-Product/${val._id}`}> <img src={val?.productimg[0]} alt="" className='w-[200px] h-[230px]  '   /> </Link>
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
        <div className='flex items-center justify-center flex-wrap   animate-pulse  '>
         
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
    </div>
    
    </div>
   
   )
}

 
export default ClickMultipluSameProduct
