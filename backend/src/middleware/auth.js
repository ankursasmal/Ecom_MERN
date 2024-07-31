let jwt =require('jsonwebtoken');
const Ecomuser = require('../model/Ecom');

let auth=async(req,res,next)=>{
    try{
let tokon=req.cookies.jwt ;
// console.log(tokon);
let verifiedUser= jwt.verify(tokon,'3y2yxhx829299292hc2rhh9h2rhcj9j2rj9r9rj92');
// console.log(verifiedUser);
let user=await Ecomuser.findOne({_id:verifiedUser._id});
 req.tokon=tokon;
req.role=user.role;
 req.user=user;
//   console.log('ankur',user._id);
next();
    }
    catch(e){
        res.status(404).json({
            mess:'not auth ',
            success:false,
            error:true,
            e:e.message || e
        })
    }
}
module.exports=auth;