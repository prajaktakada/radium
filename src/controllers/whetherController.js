const axios = require("axios");

//task-1 get weather of London from http://api.openweathermap.org/data/2.5/weather?q=London&appid=<useYourOwnAppId> 
// (NOTE: must use HTTP infront of the url else axios will attempt to hit localhost and give error  ..also use HTTP only and not HTTPS)

const wetheroflondon = async function (req, res){

    try{ 
        let q= req.query.q
        let appid= req.query.appid

        let options = {
          method : "get",
          url : `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }        
       
        let response= await axios(options)
        let centers= response.data
        console.log(centers)
        res.status(200).send( {msg: "Success", data: centers} )
    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}




//task 2 then change the above to get the temperature only( of London)
const tempratureoflondon = async function (req, res){

    try{ 
        let q= req.query.q //city i.e london
        let appid= req.query.appid //key

        let options = {
          method : "get",
          url : `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }        
       
        let whetherdata= await axios(options)
        let temprature=whetherdata.data.main.temp
        console.log("temprature of london is" +temprature)
      
        res.status(200).send( {msg: "Success", data: temprature} )
    }
    catch(err) {
        console.log(err.message)
        res.status(500).send( { msg: "Something went wrong" } )
    }
}


//task-3
// Sort the cities  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"] in order of their increasing temperature
//do not use map(),foreach() in await

const getWeather = async function (req, res) { 
    try {
  
        let cities=  ["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray=[] 
  
        // [ { city: "bengaluru", temp: 290}, { city: "Mumbai", temp: 285} ,{ city: "Delhi", temp: 291}, { city: "Kolkata", temp: 288} ]
  
        //better to use for..of here
        for (i=0 ;i<cities.length; i++){
          
            let obj= { city: cities[i] }
            let resp=  await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=f1a93c7f2832ca822dc0920253b1614a`)
            console.log(resp.data.main.temp)
  
            obj.temp= resp.data.main.temp
  
            cityObjArray.push(obj)
        }
  
        let sorted = cityObjArray.sort(  function(a, b) { return a.temp - b.temp } )
        // can pass cityObjArray also here as sort method does sorting on the same array(in place) and original array is replaced by the sorted one
        //either ways both(sorted and cityObjArray) are referring to same array..assignment by reference is the default assignment in an array
        console.log(sorted)
        res.status(200).send({status: true, data: sorted}) // can pass cityObjArray also here as sort method does sorting on the same array(in place) and original array is replaced by the sorted one
    } catch (error) {
        console.log(error)
        res.status(500).send({status: false, msg: "server error"})
    }
  }
  

  












module.exports.wetheroflondon =wetheroflondon
module.exports.tempratureoflondon=tempratureoflondon
module.exports.getWeather =getWeather 