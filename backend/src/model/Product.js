let mongoose=require('mongoose');
 
let ProductSchema= new mongoose.Schema({
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
        type:String,

     },
     selling:{
        type:String,

     },
     retailerId:{
      type:String,
}
     
})

let productModel=new mongoose.model('productModel',ProductSchema);
module.exports=productModel

