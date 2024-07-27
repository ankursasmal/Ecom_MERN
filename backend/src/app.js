require('dotenv').config();
let express=require('express')
let app=express();
let route=require('./route/allRout')
require('./db/connection')
let Ecomuser=require('./model/Ecom');
const connectionDB = require('./db/connection');
let cors = require('cors')
const bodyParser = require('body-parser');

 
let PORT=process.env.PORT || 3000;

//1. for postman data (postman ,react) *** for big size of data must declear limit and bodyParser install 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));//2. ****** html file to data (ejs,normalhtml, hbs ..) ******
 
// froned full urlhola cors use hoba (1.install) (2.middle wear)
app.use(cors({
    origin: 'http://localhost:3001',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
   credentials: true, 
    // Allowed headers
  }))


app.use(route);
 
connectionDB().then(()=>{ 
app.listen(PORT,()=>{
    console.log(`server listen ${PORT}`)
})
}).catch((e)=>{
    console.log('server not start',e.message)
})