
const jwt = require('jsonwebtoken')
const  cryptoModel= require('../models/cryptoModel.js')
const axios = require("axios");



//
 const getcryptoCurrency= async function (req, res) {
    try {
      let options = {
        method: "get",
        url: `http://api.coincap.io/v2/assets`,
        Headers:{
            Authorization:'Bearer 617fa9af-258e-4307-87e3-e9e728adf258'
        }
      };
       const cryptocurrency  = await axios(options);
       console.log("WORKING");

let sort =cryptocurrency.data.data.sort(function(a,b){return b.changePercent24Hr - a.changePercent24Hr}) 
   for(let i=0;i<sort.length;i++){
       let data =(({symbol,name,marketCapUsd,priceUsd}) =>({symbol,name,marketCapUsd,priceUsd}))(sort[i])
       await cryptoModel.findOneAndUpdate({"name":data.name},data,{upsert:true})
    }
   const finalData =await cryptoModel.find()
  res.status(200).send({data:finalData})






  
////2nd
       
//   let list= cryptocurrency.data.data;

// for(i in list){

//    let cryptoData = {
//          symbol:list[i].symbol, 
//      name:list[i].name,
//      marketCapUsd:list[i].marketCapUsd,
//     priceUsd:list[i].priceUsd
//     }
//     let cryptocreated = await cryptoModel.create(cryptoData )
//  }
//   res.status(200).send({ msg: "Successfully fetched data",data:list});

 }
     
 catch (err) {
      console.log(err.message);
      res.status(500).send({ msg: "Some error occured" });
    }
  
};
module.exports.getcryptoCurrency= getcryptoCurrency;