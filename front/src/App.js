import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './component/Nav';
import Footer from './component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummeryApi from './commonApi';
import './App.css'

//redux toolkit 
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

// for context api
import { createContext } from 'react';
const Context = createContext(null);

 function App() {
  // redux tolkit
  const dispatch=useDispatch();
 let [count,setcount]=useState(0);
  const AuthUserDetail=async()=>{
    try{
      let res=await fetch(SummeryApi.User_AuthDetail.url,{
      method:SummeryApi.User_AuthDetail.method,
      method:'GET',
      headers:{
         'Content-Type':'application/json',
      },   
    //   use in login to store jwt and logout not neccery
     credentials:"include",

   })
 let data= await res.json();
//  console.log(data) ;

if(data.success){
    //pass data to redux tolkit {setUserDetails} is function name
  dispatch(setUserDetails(data.data));

  // toast.success('authorize user');
  // console.log(data);
 }
 else{
  toast.error('not authorize user');

 }
  
 }
    catch(e){
      console.log('not authorize user',e)

      toast.error('not authorize user');
}
  }

// no of add cart items
let fetchAddCartCount= async()=>{
  try{
let res=await fetch(SummeryApi.cartItemsNo.url,{
  method:SummeryApi.cartItemsNo.method,
credentials:'include',
})
let cartno=await res.json();
setcount(cartno.itemCount);
// console.log('dataapi',cartno)
  }
  catch(e){
      console.log('data not fetch')
  }
}
// console.log("count",count)



//call on reload and also call on login so unsing context call this function under login form
  useEffect(()=>{
     AuthUserDetail();
    // cart product
    fetchAddCartCount()
  },[])

   return (
     <div style={{minHeight:'100vh',display:'flex',flexDirection:'column', }} >
     <Context.Provider value={{
      AuthUserDetail, //user detail fetch
      count ,// cart count pass
      fetchAddCartCount

     }}>
        <ToastContainer />

      <Nav/>
<Outlet/> 
<div className='mt-auto'> 
<Footer/> 
 </div>
 </Context.Provider>
    </div>
   )
 }
 
 export default App;
 export {Context};
 