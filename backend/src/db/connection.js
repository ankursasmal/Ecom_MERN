let mongoose=require('mongoose')

// connect with driver
async function connectionDB (){
   
    // MONGO_DRIVE_DB='mongodb+srv://ankurEcommerse:Ankur123@cluster0.sgwwiml.mongodb.net/Ecommerse?retryWrites=true&w=majority&appName=Cluster0'
    // SECRET_KEY='3y2yxhx829299292hc2rhh9h2rhcj9j2rj9r9rj92' 

    try{
mongoose.connect('mongodb+srv://ankurEcommerse:Ankur123@cluster0.sgwwiml.mongodb.net/Ecommerse?retryWrites=true&w=majority&appName=Cluster0');
     console.log('db connect');
}
catch(e){
    console.log('db Not connect',e.message)
} 
}

module.exports=connectionDB