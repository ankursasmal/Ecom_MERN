import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import SummeryApi from '../commonApi';
// import imgtObase64 from '../imgConvert/imgt0base64';
import { toast } from 'react-toastify';
import ProductCategory from '../imgConvert/ProductCategory';
import ShowImgBigSize from './ShowImgBigSize';
import { IoMdCloudUpload } from "react-icons/io";
 import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { RxCross2 } from "react-icons/rx";


function BecomeSeller() {
  let [show,setShow]=useState(true);
let navigate=useNavigate();
let [ShowBigimg,setShowBigImg]=useState(false);
let [SelectedImg,setSelectedImg]=useState('');
let dispatch=useDispatch();

let [data,setData]=useState({ 
    companyName:" ",
 brendname:" ", 
companyImg:[],
  location:" ",
  productType:" ",
 establish:" "})

 let user=useSelector(state=>state?.user?.user)

let value,name;
let handelchangeInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    // extra dydefault field addd below
    setData({...data,[name]:value});
      }
 
 console.log(user)
 
//  update saller inro role in Admin
 let handelNewSaler= async(e)=>{
   try{ 
   e.preventDefault();
  //  retailer is in data base all signup detail and extra field add retailer:{data}
     user={...user,retailer:data}
   console.log(user)
    let res= await fetch(SummeryApi.AdminUpdate.url+'/'+`${user?._id}`,{
      method:SummeryApi.AdminUpdate.method,
      headers:{
         'Content-Type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify(user)
    })
let result= await res.json()
  if(result.success){
    // redux tolkit must update after become saller
     dispatch(setUserDetails(result.result))
    toast.success('Saller reg sucesfull');
    navigate('/');
}

 else{
  toast.error(' Saller reg not sucesful in fronteneed');
navigate('/signup')
}
   }
 catch(e){
   navigate('/signup')
   toast.error('reg not sucesful in fronteneed');

 console.log('reg not success in frontened',e)
 }
}

 
//  To  for upload image  of retailer
const HandelUploadImage = (event) => {
  const file = event.target.files[0]; // Get the file selected by the user
  const reader = new FileReader(); 

   reader.onload = () => {
    let imgurl= (reader.result);  
    // array under store hocha array distructure
       setData({...data,companyImg:[...data.companyImg,imgurl]})
 };

// Read the file as a data URL (base64 encoded)
  reader.readAsDataURL(file);
 };


//  To see Big img on click image

let HandelZoomUploadImg=(index)=>{
setSelectedImg(data.companyImg[index]);
setShowBigImg(true);
 }
// console.log(SelectedImg,ShowBigimg);

// ***** onclick img delte it 
let handelDeleteImg=(index)=>{
  // console.log('annak')
  // setData under ****call back***** to change specfic 
  setData(data=>
    ({...data,companyImg:data.companyImg.filter((val,id)=>id!==index)}
  ))
}


// for display none
let onClose=()=>{
  setShow(true);
}
 
 return (
 
    <center className='mt-[82px] mx-[10vw] md:mx-[25vw] lg:mx-[30vw] px-3 py-4 shadow-2xl rounded-lg'>
         <div className=' absolute w-[100vw] top-[80px] left-0 h-[100%] bg-slate-200  bg-opacity-40  flex justify-center items-center '>
         <div className='bg-white rounded absolute top-[80px] left-10 md:left-[20vw]  p-4 h-[40%] w-[85%] md:h-[45%] md:w-[60%] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
                  <div className='text-3xl flex items-end justify-end w-[100%]  mr-2' onClick={( )=>navigate('/')}><RxCross2 className='text-end text-3xl'/></div>

             <div className='flex items-center justify-between px-2'>
  
           <div className='flex justify-center w-[100%]'>  <h1 className='text-2xl font-semibold '>Want To Become a Saller </h1> </div> 
            {/* props through onClose Function call */}
     
            </div>

            <form action="" className='mx-[10%]'>
              <div className='flex flex-col items-start  '> 
                <label htmlFor='companyName' className='text-2xl my-1'>CompanyName:</label>
                <input type="text" id="companyName" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='companyName' value={data.companyName} onChange={handelchangeInput}/>
                </div>
                <div className='flex flex-col items-start '> 
                <label htmlFor='Brendname' className='text-2xl my-1'>BrendName:</label>
                <input type="text" id="Brendname" placeholder='enter brendname Name' name='brendname' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.brendname} onChange={handelchangeInput}/>
                </div>

                {/* catagory  map value*/}
                <div className='flex flex-col items-start '> 
                <label htmlFor='productType' className='text-2xl my-1'>ProductType:</label>
                                <select name="productType" id=""  className='py-1.5 rounded-lg border-[3px] w-[100%] border-black'  onChange={handelchangeInput}>
                                <option value={""}  >Select Options</option>

                                  {ProductCategory.map((val)=>{
                                    return(
                                      <option value={val.value} key={val.id}>{val.value}</option>
                                    )
                                  })}
                                </select>
                 </div>

{/* upload img in input section */}
               <div className='flex flex-col items-start '> 
    <label htmlFor='companyImg' className='text-2xl my-1'>CompanyImg:</label>
                 <div className='   py-20 rounded-lg border-[3px] w-[100%] border-black ' > 
                 <label htmlFor='companyImg' className='flex flex-col items-center justify-center cursor-pointer' >

<div className='text-4xl'><IoMdCloudUpload/></div>
<a className='text-lg mt-4'>Upload Image  </a>     
      <input type="file"  id="companyImg"  className='self-center ml-[10vw] mt-3 hidden' onChange={HandelUploadImage}/>

      </label>
      </div>

      {/* for display images under arry of product img and see and delete operation*/}
      <div className='flex items-center justify-center flex-wrap m-3'> 
      {data.companyImg?.map((val,index)=>{
        return(
          <div key={index} className='w-[30%] relative m-3'>
          <img src={val} alt="" style={{width:'100%',height:'100%'}}  onClick={()=>HandelZoomUploadImg(index)}/>
        <div className='text-red-600 absolute bottom-0 right-0 text-2xl bg-white ' onClick={()=>{handelDeleteImg(index)}} >
          <MdDelete/>
          </div>
        </div>)
      })}

            </div>   


</div>

 
                <div className='flex flex-col items-start '> 
                <label htmlFor='location' className='text-2xl my-1'>Location:</label>
                <input type="text" id="location" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='location' value={data.location} onChange={handelchangeInput}/>
                 </div>

                      <div className='flex flex-col items-start '> 
                <label htmlFor='establish' className='text-2xl my-1'>Establish:</label>
                <input type='number' id="establish" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='establish' value={data.establish} onChange={handelchangeInput}/>
                </div>

               

                <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center'  onClick={handelNewSaler}>Upload Product</button> 
            </form>

   </div>
   {ShowBigimg &&
<ShowImgBigSize onClose={()=>setShowBigImg(false)}  image={SelectedImg} />}

     </div>
       </center>
  )
}
 
export default BecomeSeller
