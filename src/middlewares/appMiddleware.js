const validateAppType = function(req, res, next){
    let appTypeHeader = req.headers['isfreeapp']  //.x-isfreeapp also we write like this
    let isAppFree
    if(!appTypeHeader) {
        return res.send({message: 'Mandatory header missing'})
    }

    if(appTypeHeader === 'false') {
        isAppFree = false
    } else {
        isAppFree = true
    }
    req.isFreeAppUser = isAppFree

    next()
}

module.exports.validateAppType = validateAppType






















// //2nd

// let capturedInfo = function(req,res,next){

//     let acceptheadervalue = req.headers['isfreeapp']  //[' freeAppUser']
   
//     console.log(acceptheadervalue);
    
//     if(!acceptheadervalue){
//         res.send({alert:"missing"})
//     }else{
//     if(acceptheadervalue==="true"){
//         acceptheadervalue=true
        
//     }else{
//         acceptheadervalue=false;
        
//     }
//     req.isfreeAppUser=true;
//     next()
// }
// }


















// module.exports.capturedInfo=capturedInfo




