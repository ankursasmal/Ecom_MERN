let mongoose=require('mongoose');
let validator=require('validator');

let DeliveryOrderSchema= new mongoose.Schema({
    DeliveryAddress:{
        type:[]
     },
    orderProduct:{
        type:[]
    },
    DeliveryStatus:{
type:String
    },
    userId:{
        type:String
    },
    totalPayment:{
        type:String
    }
})

let DeliveredOrderModel=new mongoose.model('DeliveredOrderModel',DeliveryOrderSchema);
module.exports=DeliveredOrderModel

