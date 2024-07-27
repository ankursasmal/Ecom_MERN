 let indianCurrrency=(num)=>{
    let formeter=new Intl.NumberFormat('en-IN',{
        style:'currency',
        currency:'INR',
        minimumFractionDigits:2
    })
    return formeter.format(num);
 }

 export default indianCurrrency;
