import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import ProductCategory from '../imgConvert/ProductCategory';
import { IoMdCloudUpload } from "react-icons/io";
import ShowImgBigSize from './ShowImgBigSize';
import { MdDelete } from "react-icons/md";
import SummeryApi from '../commonApi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function AdminEditProduct(props) {
  let {fetchCatagoryProduct,specificId,onClose,fetchAllData}=props;
  //  id get from props
  let [GetIdDataId,setGetIdDataId]=useState(specificId);
  
 // if role==admim then he can uplod product other general user only buy
let AuthUserRole=useSelector(state=>state.user.user);

// for see img big onclick hide and display
let [ShowBigimg,setShowBigImg]=useState(false);
// for send click image as a props 
let [SelectedImg,setSelectedImg]=useState('');

// data store form props->id get request 
let [getProductDataPropsId,setgetProductDataPropsId]=useState({});
// console.log("getProductDataPropsId",getProductDataPropsId);

// imitial alue insteed of ""  after geting id vallue incial data 
let [data, setData] = useState({
  productname: '',
  brendname: '',
  productimg: [],
  category: '',
  description: '',
  price: '',
  selling: ''
}); 
 
// initail in useEffect according getProductDataPropsId
   useEffect(()=>{
   setData({
    productname: getProductDataPropsId?.productname || '',
    brendname: getProductDataPropsId?.brendname || '',
    productimg: getProductDataPropsId?.productimg || [],
    category: getProductDataPropsId?.category || '',
    description: getProductDataPropsId?.description || '',
    price: getProductDataPropsId?.price || '',
    selling: getProductDataPropsId?.selling || ''
  });
},[getProductDataPropsId])
  // console.log(data)

 

let name,value;
let handelchangeInput=(e)=>{
name=e.target.name;
value=e.target.value;
setData({...data,[name]:value});
}
// console.log("data onchange",data);

// value accroding to id
let ProdctData=async()=>{
  try{
    let res=await fetch(SummeryApi.SpecificProduct.url+'/'+`${GetIdDataId}`,{
      method:SummeryApi.SpecificProduct.method,
      credentials:'include'
    });
    let data=await res.json();
    if(data.success){
      setgetProductDataPropsId(data.products);
    }
  }
  catch(e){
console.log('error',e.message)
  }
}
useEffect(()=>{
ProdctData();

},[])
  // console.log(getProductDataPropsId)
 

// //********** */ for upload image in input
const HandelUploadImage = (event) => {
  const file = event.target.files[0]; // Get the file selected by the user
  const reader = new FileReader(); 

   reader.onload = () => {
    let imgurl= (reader.result);  
    // array under store hocha array distructure
       setData({...data,productimg:[...data.productimg,imgurl]})
 };

// Read the file as a data URL (base64 encoded)
  reader.readAsDataURL(file);
 };


//  To see Big img on click image

let HandelZoomUploadImg=(index)=>{
setSelectedImg(data.productimg[index]);
setShowBigImg(true);
 }
// console.log(SelectedImg,ShowBigimg);

// ***** onclick img delte it 
let handelDeleteImg=(index)=>{
  // console.log('annak')
  // setData under ****call back***** to change specfic 
  setData(data=>
    ({...data,productimg:data.productimg.filter((val,id)=>id!==index)}
  ))
}


// handelUploadProducePost  update product detail  
let handelProduceUpdate=async (e)=>{
  e.preventDefault();
  try{
    // console.log(AuthUserRole.role)
  if(AuthUserRole.role==='ADMIN'){
let res= await fetch(SummeryApi.updateProduct.url+'/'+`${GetIdDataId}`,{
  method:SummeryApi.updateProduct.method,
  headers:{
    'Content-Type':'application/json'
 },

credentials: 'include',

 body:JSON.stringify(data)
})

let result=await res.json();
// console.log(result)
if(result){
  toast.success('data upload success');
  if(!fetchAllData){
      fetchCatagoryProduct();
  }
  if(!fetchCatagoryProduct){
    fetchAllData();
}
 }
else{
  toast.error('data upload not success');

}
}
else{
  toast.error('data upload not success');

}
 }

  catch(e){
    toast.error('data upload not success',e.message);

  }
}


 return (
    <div className=' absolute w-[100vw]  top-[8vw]  left-0 h-[100%] bg-slate-200  bg-opacity-40  flex justify-center items-center '>
         <div className='bg-white rounded absolute top-[11vw] left-[5vw] md:left-[20vw] p-4  w-[90%] h-[50%] md:h-[50%] md:w-[60%] z-10 overflow-y-auto' style={{backgroundColor:'white !important'}}>
            <div className='flex items-center justify-between px-2'>
            <div className='w-[100%]'>
            <h1 className='text-lg font-semibold self-center text-center'>Edit Product Detail</h1> 
            </div>
            {/* props through onClose Function call */}
<div className='text-2xl' onClick={onClose}><RxCross2/></div>
    
            </div>

            <form action="" className='mx-[10%]'>
              <div className='flex flex-col items-start  '> 
                <label htmlFor='productname' className='text-2xl my-1'>ProductName:</label>
                <input type="text" id="productname" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='productname' value={data.productname} onChange={handelchangeInput}/>
                </div>
                <div className='flex flex-col items-start '> 
                <label htmlFor='Brendname' className='text-2xl my-1'>BrendName:</label>
                <input type="text" id="Brendname" placeholder='enter brendname Name' name='brendname' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' value={data.brendname} onChange={handelchangeInput}/>
                </div>

                {/* catagory  map value*/}
                <div className='flex flex-col items-start '> 
                <label htmlFor='Category' className='text-2xl my-1'>Category:</label>
                                <select name="category" id=""  className='py-1.5 rounded-lg border-[3px] w-[100%] border-black'  onChange={handelchangeInput}>
 
                                  {ProductCategory.map((val)=>{
                                    return(
                                      <option value={val.value} key={val.id}>{val.value}</option>
                                    )
                                  })}
                                </select>
                 </div>

{/* upload img in input section */}
               <div className='flex flex-col items-start '> 
    <label htmlFor='Productimg' className='text-2xl my-1'>ProductImg:</label>
                 <div className='   py-20 rounded-lg border-[3px] w-[100%] border-black ' > 
                 <label htmlFor='Productimg' className='flex flex-col items-center justify-center cursor-pointer' >

<div className='text-4xl'><IoMdCloudUpload/></div>
<a className='text-lg mt-4'>Upload Image  </a>     
      <input type="file"  id="Productimg"  className='self-center ml-[10vw] mt-3 hidden' onChange={HandelUploadImage}/>

      </label>
      </div>

      {/* for display images under arry of product img and see and delete operation*/}
      <div className='flex items-center justify-center flex-wrap m-3'> 
      {data.productimg?.map((val,index)=>{
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
                <label htmlFor='description' className='text-2xl my-1'>Description:</label>
                <input type="text" id="description" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='description' value={data.description} onChange={handelchangeInput}/>
                 </div>

                      <div className='flex flex-col items-start '> 
                <label htmlFor='price' className='text-2xl my-1'>Price:</label>
                <input type='number' id="price" placeholder='enter product Name' className='py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='price' value={data.price} onChange={handelchangeInput}/>
                </div>

                 <div className='flex flex-col items-start '> 
                <label htmlFor='selling' className='text-2xl my-1'>Selling:</label>
                <textarea type="number" id="selling" placeholder='enter product Name' className='resize-none py-1.5 rounded-lg border-[3px] w-[100%] border-black' name='selling' value={data.selling} onChange={handelchangeInput}></textarea>
                </div>  

                <button type='submit' className='px-4 w-[100%] py-1.5 bg-blue-500 text-white self-center rounded-full my-3 text-center'  onClick={handelProduceUpdate}>Upload Product</button> 
            </form>

   </div>
   {ShowBigimg &&
<ShowImgBigSize onClose={()=>setShowBigImg(false)}  image={SelectedImg} />}

     </div>
  )
}

 
export default AdminEditProduct


 