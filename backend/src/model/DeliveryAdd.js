let monngoose=require('mongoose')
let daelivetySchema=new monngoose.Schema({
    name:{
        type:String
    },
    Add:{
        type:String
    },
    phone:{
        type:Number
    },

    pin:{
        type:Number
    },
    landMark:{
        type:String
    },
    userId:{
        type:String
    },
    date:{
        type: Date,
  default: Date.now()
    }
})


let DeliveyAdd= new monngoose.model('DeliveyAdd',daelivetySchema);

module.exports=DeliveyAdd;