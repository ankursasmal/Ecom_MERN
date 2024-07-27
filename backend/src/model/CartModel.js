let mongoose=require('mongoose');
 
let CartSchema= new mongoose.Schema({
   userId:{
    type:String,
   }, 
   productname:{
    type:String,
    required:true,
 },
 brendname:{
    type:String,
     

}, productimg:{
    type:[],
  },
  category:{
    type:String,
  },
  description:{     
       type:String,
 },
 price:{
    type:Number,

 },
 selling:{
    type:Number,

 },
 no:{
  type:Number,

 },
 cartTime: {
  type: Date,
  default: Date.now()
}
      
})

let cartModel=new mongoose.model('cartModel',CartSchema);
module.exports=cartModel


// // {
// ref is forain key like mysql
// ref:'cart',
// trpe:string}
