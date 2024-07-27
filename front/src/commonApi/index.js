import CatagoryList from "../component/CatagoryList";

const BackendDomin='http://localhost:3000'

const SummeryApi={
    signUp:{
        url:`${BackendDomin}/signup`,
        method:"POST"
    },
    AdminUpdate:{
         url:`${BackendDomin}/adminUpdate`,
        method:"PUT"
    },
    Login:{
        url:`${BackendDomin}/login`,
        method:"POST"
    },
    
    User_AuthDetail:{
        url:`${BackendDomin}/user-detail`,
        method:"GET"
    },
    Logout:{
        url:`${BackendDomin}/logout`,
        method:"GET"
    },
    AuthUser:{
        url:`${BackendDomin}/user-detail`,
        method:"GET"
    },
    PoductUpload:{
        url:`${BackendDomin}/product-upload`,
        method:"POST"
    },
    PoductDisplay:{
        url:`${BackendDomin}/all-products`,
        method:"GET"
    },
    SpecificProduct:{
        url:`${BackendDomin}/specific-product`,
        method:"GET"   
    },
   updateProduct:{
    url:`${BackendDomin}/update-product`,
        method:"PUT"  
   }  ,

   GetCatagoryWiseData:{
    url:`${BackendDomin}/getcatrgory-product`,
        method:"GET"  
   },
   CatagoryWiseProduct:{
    url:`${BackendDomin}/catagorywise-product`,
    method:"GET"  
   } ,
   cartItems:{
    url:`${BackendDomin}/cart`,
    method:"POST"  
   } ,
   cartItemsNo:{
    url:`${BackendDomin}/cartItemno`,
    method:"GET"  
   } ,
   AddcartItems:{
    url:`${BackendDomin}/cartItem`,
    method:"GET"  
   } ,
   NoOfItems:{
    url:`${BackendDomin}/quentity`,
    method:"PUT"  
   } ,
   DeleteCartItems:{
    url:`${BackendDomin}/deleteCartItems`,
    method:"DELETE"  
   } 
,
SearchItems:{
    url:`${BackendDomin}/searchItems`,
    method:"GET"  
   } ,
   orderDatas:{
    url:`${BackendDomin}/orderData`,
    method:"GET"  
   } ,
   DeleteCartData:{
      url:`${BackendDomin}/deleteCartData`,
      method:"DELETE"  
     } ,
 DeliveryAdd:{
     url:`${BackendDomin}/deliveryAdd`,
      method:"POST"  
       } ,
  DeliveryData:{
  url:`${BackendDomin}/deliveryData`,
 method:"GET"  
} ,
  DeleteDeliveryAdd:{
  url:`${BackendDomin}/deleteDeliveryAdd`,  

 method:"DELETE"  
} ,
EditAddress:{
    url:`${BackendDomin}/editDeliveryAddress`, 
 method:"PUT" 
} ,
GetAddress:{
    url:`${BackendDomin}/getAddressById`, 
 method:"GET" 
},
 
UserAllOrder:{
    url:`${BackendDomin}/userAllOrder`, 
    method:"POST" 
},
EmptyCart:{
    url:`${BackendDomin}/emptyCart`, 
    method:"DELETE"   
},
MyOrder:{
    url:`${BackendDomin}/my-order`, 
    method:"GET"  
}


}
export default SummeryApi;