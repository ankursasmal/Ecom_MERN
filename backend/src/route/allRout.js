 let express=require('express');
let route= express.Router();
require('../db/connection.js')
let Ecomuser=require('../model/Ecom.js');
let bcript=require('bcryptjs');
let jwt=require('jsonwebtoken');
let cookie=require('cookie-parser');
let auth=require('../middleware/auth.js');
const productModel = require('../model/Product.js');
let cartModel=require('../model/CartModel.js');
const DeliveyAdd = require('../model/DeliveryAdd.js');
const DeliveredOrderModel = require('../model/Order.js');
 
route.use(cookie());

route.get('/',(req,res)=>{
    res.send('ok')
})


// 1.signUp req
route.post('/signup',async(req,res)=>{
try {
    let payload=req.body;
     payload={...payload,role:'GENERAL',date:new Date(),retailer:{}};
     let {name,email,password,cpassword,role,date}=payload;
 //  check user already exist
          let ExistUser= await Ecomuser.findOne({email:email})
if(ExistUser){
    throw new Error('already exist user')
}
 if(password !==cpassword){
    throw new Error('password & confirm password not match ')
}
if(!name || !email || !password || !cpassword ){
    throw new Error('Fill the form properly ')
}
    
let data= new Ecomuser({
        name:name,
        email:email,
        password:password,
        cpassword:cpassword,
        role:role,
        date:date,
        retailer:{}
    })   
   
  // bcript using sync
// sync use kola  becript a
const solt=bcript.genSaltSync(10);
let  BcriptPassword=await bcript.hashSync(password,solt);
 let BcriptCpassword=await bcript.hashSync(cpassword,solt);
if(!BcriptPassword || !BcriptCpassword){
    throw new Error('bcript pass not gen')
}
data.password=BcriptPassword;
data.cpassword=BcriptCpassword;
//   console.log(data)

  let result=await data.save();
     res.status(201).json({mess:'data store succesfully',success:true,result:result});
}
catch(e){
    console.log('data not store db')
    
    res.status(401).json({mess:'data  not store bd',success:false,e:e.message})
}

})


// 2.login route
route.post('/login',async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(email=='' ||password==''){
            throw new Error('fill the form properly')
        }
        // console.log(email,password);
        // if not findOne it will conme arr pf object formet [{data}] so necccery findOne
        let data=await Ecomuser.findOne({email:email});
            let isMatch=await bcript.compare(password,data.password);
             if(!isMatch){
                throw new Error('not login succes')
            }
            if(!data){
                throw new Error('not login succes')
 }
            
        let tokon= jwt.sign({_id:data._id},'3y2yxhx829299292hc2rhh9h2rhcj9j2rj9r9rj92',{expiresIn:'30d'});
        //   console.log(tokon);
        res.cookie('jwt',tokon,{expiresIn:'3d',httpOnly:true,secure:true});
        return res.status(200).json({ message: 'Login successful', success: true });


    }
    catch(e){
console.log('login not success');
res.status(200).json({mess:'login not success',e:e.message,success:false})
    }
})

// bocome a seller and also update role in admin
 route.put('/adminUpdate/:id',auth,async(req,res)=>{
    try {
        let id=req.params.id;
        //  console.log(id)

         let payload=req.body;
        payload={...payload,role:'ADMIN'}
        //  console.log("payload",payload)
        
        let ExistUser= await Ecomuser.findOne({_id:id})
    if(!ExistUser){
        throw new Error('already exist user')
    }
    // console.log(ExistUser)
 
    let updateUserInfo=await  Ecomuser.findByIdAndUpdate({_id:id},payload,{new:true})

    console.log('data store')
        res.status(201).json({mess:'data update succesfully',success:true,result:updateUserInfo});
    }
    catch(e){
        console.log('data not store db')
        
        res.status(401).json({mess:'data  not store bd',success:false,e:e.message})
    }
    
    })
    

// user Detail get req
route.get('/user-detail',auth,async(req,res)=>{
try{
//  **************** for use auth frontentd must use (credentials: 'include') 
// else jwt not come from frontned  *******************

    // for only auth user
    let data=req.user;
     // for all user
    let users=await Ecomuser.find();
    if(!data){
        throw new Error('not authorize')
    }
     res.status(200).json({
        success:true,
        data:req.user,
        users:users
    })
}
catch(e){
    console.log('not authorize');
    res.status(404).json({mess:'not authorize',
        e:e.message,
        success:false,
    })
}
})


// // update users detail in AllUSer Under ChangeUserRole File in frontned
route.put('/user-update/:userId',async(req,res)=>{
    try{
         let Id=req.params.userId;
 let payload=req.body;
 
let users=await Ecomuser.findByIdAndUpdate({_id:Id}, payload, { new: true })
        
         if(!users){
            throw new Error('not update')
        }else{
         res.status(200).json({
            mess:'update success',
            success:true,
             users:users
        })
    }
 
    }
    catch(e){
        console.log('not update');
        res.status(404).json({mess:'not authorize',
            e:e.message,
            success:false,
        })
    }
    })

 // get specific user detail
 route.get('/specific-user/:id',async(req,res)=>{
try{
    let id=req.params.id;
    // console.log(id)
         let user=await Ecomuser.find({_id:id});
         res.status(200).json({
            mess:'dataa get',
            data:user,
            success:true,
            error:false
         })

}
catch(e){
    res.status(400).json({
        mess:'data not get',
         success:false,
        error:true
     })
}
 })

// for upload products from frontned
route.post('/product-upload',auth,async(req,res)=>{
    try{
        // **************** for use auth frontentd must use (credentials: 'include') 
        // else jwt not come from frontned  *******************
         
        let role=req.role;
        let payload=req.body;
        payload={...payload,retailerId:req.user._id};
         if(role=="ADMIN"){
               // console.log(productname,price,selling)
        let productData=await new productModel(payload);
        let product=await productData.save();
        res.status(201).json({
            mess:'data post succ',
            product:product,
            success:true,
            error:false
         })
        }
        else{
            throw new Error('Not authorize to upload products')
        }
    }
    catch(e){
        res.status(401).json({
            mess:'dataa post not succesful',
             success:false,
            error:true
         })
    }
})


// for display Products in Allproduct frontned page
route.get('/all-products/:id',async(req,res)=>{
try{
    let Id=req.params.id;
    let data=await productModel.find({retailerId:Id});
    if(!data){
        throw new Error('data not get backend')
    }
    res.status(200).json({
        mess:'all product get success',
        success:true,
        error:false,
        data:data
    })
}
    catch(e){
        res.status(401).json({
            mess:'dataa post not succesful',
             success:false,
            error:true,
            e:e.message

            })
    }
})

// specific product acording id
route.get('/specific-product/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        // console.log(id)
        // must findOne else value come under [{}];  for params type of req
             let products=await productModel.findOne({_id:id});
            //  console.log(products)
             res.status(200).json({
                mess:'data get',
                products:products,
                success:true,
                error:false
             })
    
    }
    catch(e){
        res.status(400).json({
            mess:'data not get',
             success:false,
            error:true
         })
    }
     })


    //  update product details
route.put('/update-product/:id',auth,async(req,res)=>{
        try{
              let id=req.params.id;
         let payload=req.body;
let role=req.role;
        if(role=='ADMIN'){
            // must findOne else value come under [{}];  for params type of req
                 let products=await productModel.findOne({_id:id});
                 if(products){
                    let data=await productModel.findByIdAndUpdate({_id:id},payload,{new:true});
                 
                //  console.log(products)
                 res.status(200).json({
                    mess:'dataa get',
                    products:data,
                    success:true,
                    error:false
                 })
                }
                else{
                    throw new  Error('id not valid ')
                }
            }
            else{
                throw new  Error('not Authorize to change product detail ')
            }

        }
        catch(e){
            res.status(400).json({
                mess:'data not update',
                 success:false,
                error:true,
               e: e.message
             })
        }
         })   


// catagory wise data fetch
route.get('/getcatrgory-product',async(req,res)=>{

    try{
        let ProductCatagory=await productModel.distinct('category');
// all unique data from whole model's {} get arry formet
// console.log(ProductCatagory)

let data=[];
for( let catagory of ProductCatagory){
    let product=await productModel.findOne({category:catagory});
if(product){
    data.push(product);
}
}
// get all type of data 1 pice
// console.log(data)

        res.status(404).json({mess:'data get',
            CatagoryData:data,
             success:true,
             error:false
         })
    }
    catch(e){
        res.status(404).json({mess:'data not get',
            e:e.message,
            success:false,
            error:true,
 
         })
    }
})


// caaory wise products
route.get('/catagorywise-product/:catagory',async(req,res)=>{
    try{
let catagoryName=req.params.catagory;
// console.log(catagoryName);
let data=await productModel.find({category:catagoryName});
let lowToHigh=await productModel.find({category:catagoryName}).sort({price:1})
let HigtToLow=await productModel.find({category:catagoryName}).sort({price:-1})


if(data){
        res.status(200).json({mess:'data get',
             success:true,
            error:false,
 products:data,
 lowToHigh:lowToHigh,
 HigtToLow:HigtToLow
         })

        }
    }
    catch(e){
  res.status(404).json({mess:'data not get',
             success:false,
            error:true,
            e:e.message,

         })
    }
})

// product cart
route.post('/cart',auth,async(req,res)=>{
    try {
          let payload=req.body;
         payload={...payload,userId:req.user._id,no:1}
        //  console.log(payload)
    //  check user already exist
    let userunderProduct=await cartModel.find({ userId:payload.userId });
    //  console.log(userunderProduct);

     // if same user same product want to add in cart
  for(let product of userunderProduct){
    if(product._id===payload._id){
        throw new Error('product alweady add to cart')

    }
 }
    if(!payload.userId){
        throw new Error('user  not auth ')

    } 
    let data= new cartModel(payload);   
      let result=await data.save();
    // console.log('data store')
        res.status(201).json({mess:'cart succesfully',success:true,products:result});
    }
    catch(e){
        // console.log('cart not store')
         res.status(401).json({mess:'cart  not store bd',success:false,e:e.message})
    }
    
    })
    

//  no of cart
route.get('/cartItemno', auth, async (req, res) => {
    try {
        let userId = req.user._id; // Assuming req.user._id is a string
    // new ObjectId('667fb54e18f76c84aa7f0ebc') -> to 667fb54e18f76c84aa7f0ebc
    //ObjectId compear with ObjectId but not comapare  667fb54e18f76c84aa7f0ebc so transform it hxsString()
      userId=(userId.toHexString());
  
        let count = await cartModel.find({ userId: userId }).countDocuments();
        // console.log(count);

        res.status(201).json({ mess: 'cart successfully', success: true, itemCount: count });
    } catch (e) {
        res.status(401).json({ mess: 'cart not stored in DB', success: false, e: e.message });
    }
});


// show cart add items
route.get('/cartItem', auth, async (req, res) => {
    try {
        let userId = req.user._id;
        userId=(userId.toHexString());

        let cartData = await cartModel.find({ userId: userId }) ;
 
        res.status(201).json({ mess: 'cart successfully', success: true, items: cartData });
    } catch (e) {
        res.status(401).json({ mess: 'cart not stored in DB', success: false, e: e.message });
    }
});


// quentity Increment and Decrement
route.put('/quentity/:id', async (req, res) => {
    try {      
          let payload=req.body;

         let id=req.params.id;
 let product=await cartModel.findOne({_id:id});
if(!product){
    throw new Error('items not exist');
}
        let cartData = await cartModel.findByIdAndUpdate({ _id:id },payload,{new:true}) ;
 
        res.status(201).json({ mess: 'cart update successfully', success: true, items: cartData });
    } catch (e) {
        res.status(401).json({ mess: 'cart not update in DB', success: false, e: e.message });
    }
});

// delete cart items
route.delete('/deleteCartItems/:id', async (req, res) => {
    try {      
         let id=req.params.id;
 let product=await cartModel.findOne({_id:id});
if(!product){
    throw new Error('items not exist');
}
        let cartData = await cartModel.deleteOne({ _id:id }) ;
         res.status(201).json({ mess: 'cart delete successfully', success: true, items: cartData });
    } catch (e) {
        res.status(401).json({ mess: 'cart not delete in DB', success: false, e: e.message });
    }
});


// search data 
route.get('/searchItems', async (req, res) => {
    try {    
        // for resive query no need ?q= directly axcess it  
         let querySearch=req.query.q;
        //  console.log(querySearch);
        //  regular expression for case sencitive
        let regex= new RegExp(querySearch,'i','g');
         
         let product=await productModel.find({"$or":[
            {  productname:regex},
             {brendname:regex} ,
              {category:regex}
         ]});
if(!product){
    throw new Error('items not exist');
}
  
        res.status(201).json({ mess: 'cart delete successfully', success: true, items: product });
    } catch (e) {
        res.status(401).json({ mess: 'cart not delete in DB', success: false, e: e.message });
    }
});


// order page and store order data
route.get('/orderData/:id', async (req, res) => {
    try {    
         let id=req.params.id; 
        //  console.log(id)  
      
         let product=await cartModel.find({userId:id});
        //  console.log(product)
if(!product){
    throw new Error('items not exist');
}
  
        res.status(201).json({ mess: 'cart delete successfully', success: true, order: product });
    } catch (e) {
        res.status(401).json({ mess: 'cart not delete in DB', success: false, e: e.message });
    }
});

// delete all Cart DAta
route.delete('/deleteCartData/:userId', async (req, res) => {
    try {  
let id=req.params.userId;
         let product=await cartModel.deleteMany({userId:id});
if(!product){
    throw new Error('items not delete');
}
  
        res.status(201).json({ mess: 'cart delete successfully', success: true, order: product });
    } catch (e) {
        res.status(401).json({ mess: 'cart not delete in DB', success: false, e: e.message });
    }
});


// delivery address post
route.post('/deliveryAdd',auth, async (req, res) => {
    try {  
        let payload=req.body;
        payload={...payload,userId:req.user._id}
        //   console.log(payload);
   let delivveryAdd=new DeliveyAdd(payload);
          let data=await delivveryAdd.save();
 
        res.status(201).json({ mess: 'address add successfully', success: true, address: data });
    } catch (e) {
        res.status(401).json({ mess: 'address not add', success: false, e: e.message });
    }
});


// // delivery address get
route.get('/deliveryData',auth, async (req, res) => {
    try {  
       let id=req.user._id;
    //    console.log(id);
   let Address=await DeliveyAdd.find({userId:id});    
   if(!Address){
            throw new Error('items not fetch');
        }
        // console.log(Address)
        res.status(201).json({ mess: 'address fetch successfully', success: true, address: Address });
    }
     catch (e) {
        res.status(401).json({ mess: 'address not fetch', success: false, e: e.message });
    }
});


// delete delivery adddress
route.delete('/deleteDeliveryAdd/:id',async (req, res) => {
    try {  
        let Id=req.params.id;
        // console.log(Id)
    let Address=await DeliveyAdd.findByIdAndDelete({_id:Id});    
   if(!Address){
            throw new Error('items not delete');
        }
        // console.log(Address)
        res.status(201).json({ mess: 'address delete successfully', success: true, address: Address });
    }
     catch (e) {
        res.status(401).json({ mess: 'address not delete', success: false, e: e.message });
    }
});

// edit Delivery Address 
route.put('/editDeliveryAddress/:id', async (req,res) => {
    try {  
        let payload=req.body;
        let id=req.params.id;
        // console.log(id)
        let add=await DeliveyAdd.findOne({_id:id});
 if(!add){
    throw new Error('add not found');
 }  
           let data=await DeliveyAdd.findByIdAndUpdate({_id:id},payload,{new:true});
 
        res.status(201).json({ mess: 'address update successfully', success: true, address: data });
    } catch (e) {
        res.status(401).json({ mess: 'address not add', success: false, e: e.message });
    }
});


// get specific id for edit address and for 
route.get('/getAddressById/:id', async (req, res) => {
    try {  
       let Id=req.params.id;
    //   console.log(Id);
   let Address=await DeliveyAdd.findOne({_id:Id});    
   if(!Address){
            throw new Error('items not fetch');
        }
        //  console.log(Address)
        res.status(201).json({ mess: 'address fetch successfully', success: true, address: Address });
    }
     catch (e) {
        res.status(401).json({ mess: 'address not fetch', success: false, e: e.message });
    }
});
 

// all orders after payment or user order history
route.post('/userAllOrder',auth,async(req,res) => {
    try {  
       let id=req.user._id;
    //    console.log(userId);
        let payload=req.body
        // console.log(payload)
       payload={...payload,userId:id,DeliveryStatus:'success'};
//   console.log(payload)
     let data=new DeliveredOrderModel(payload);
     let allOrders=await data.save();
         res.status(201).json({ mess: 'order fetch successfully', success: true, allOrders: allOrders });
    }
     catch (e) {
        res.status(401).json({ mess: 'oredr not fetch', success: false, e: e.message });
    }
});
 
// after payment success cart data will empty
 
route.delete('/emptyCart',auth ,async (req, res) => {
    try {  
       let Id=req.user._id;

    //   console.log(Id);
   let Address=await cartModel.deleteMany({userId:Id});    
   if(!Address){
            throw new Error('  not delete cart items');
        }
    //  console.log(Address)
        res.status(201).json({ mess: '  delete cart items successfully', success: true, });
    }
     catch (e) {
        res.status(401).json({ mess: 'not delete cart items', success: false, e: e.message });
    }
});

// get all oreder details
route.get('/my-order',auth ,async (req, res) => {
    try {  
        let id=req.user._id;
    let order=await DeliveredOrderModel.find({userId:id}); 
    // console.log(order)   
   if(!order){
            throw new Error('items not fetch');
        }
        //  console.log(Address)
        res.status(201).json({ mess: 'address fetch successfully', success: true, order: order });
    }
     catch (e) {
        res.status(401).json({ mess: 'address not fetch', success: false, e: e.message });
    }
});
 



// logout
route.get('/logout',async(req,res)=>{
    try{
        res.clearCookie('jwt');
         res.status(200).json({
            success:true,
            data:[],
            error:false
        })
    }
    catch(e){
        console.log('not authorize');
        res.status(404).json({mess:'not authorize',
            e:e.message,
            success:false,
         })
    }
})

 
module.exports=route;