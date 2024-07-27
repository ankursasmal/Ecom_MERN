import React from 'react'
 import CatagoryList from '../component/CatagoryList';
 import Carsole from '../component/Carsole';
import SingleCatagoryProduct from '../component/SingleCatagoryProduct';
import SingleCatagoryProductVertical from '../component/SingleCatagoryProductVertical';
 
function Home() {
 

  return (
    <div className='mt-[14vw] md:mt-[8vw] xl:mt-[7vw] px-4'>
      <CatagoryList/>
 
 <Carsole/> 
 <SingleCatagoryProduct Title={"Top's Mobile Brand"} catagory={'mobiles'}   />  
 <SingleCatagoryProduct Title={"Top's processor Brand"} catagory={'processor'}   />  
 <SingleCatagoryProduct Title={"Top's earphones Brand"} catagory={'earphones'}   />  
 {/* /varticals product */}
 <SingleCatagoryProductVertical Title={"Top's Mobile Brand"} catagory={'mobiles'}   />  
 <SingleCatagoryProductVertical Title={"Top's Processor Brand"} catagory={'processor'}   />  

     </div>
  ) 

}

export default Home
