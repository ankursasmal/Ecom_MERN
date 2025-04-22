let mongoose=require('mongoose')

// connect with driver
async function connectionDB (){
   
    

    try{
mongoose.connect(process.env.MongoConnection);
     console.log('db connect');
}
catch(e){
    console.log('db Not connect',e.message)
} 
}

module.exports=connectionDB;