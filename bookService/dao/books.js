
const path= require('path');
const rootPath= path.resolve(__dirname, '../../');
const filepath=path.join(rootPath, 'resources/Bookjson.json');
const fs = require('fs');
const getAllDataFromDynamoDB = require('./daoImpl');



exports.query_by_arg = async(value) =>{
    if(value !== "IN" && value!=="IR"  && value!="US-NC"){
        return null;
    }

     try {
    // Use the asynchronous DAO function to get data from DynamoDB
    const data = await getAllDataFromDynamoDB();
    // console.log(data)
    // Process the data based on the location value
    const results = data.map((item) => {
      const resultItem = { ...item };
      console.log("CHECKING PRIZE",resultItem.price);
        if(value === "US-NC"){
            resultItem.price *= 1.08;
        }else if(value === "IE"){
            resultItem.price *= 1.23;
            resultItem.price*=0.95;
        }else if(value === "IN"){
            resultItem.price *= 1.18;
            resultItem.price*=83.00;
        }
        resultItem.price=Math.round((resultItem.price + Number.EPSILON) * 100) / 100
    //   console.log("Results   ========>",resultItem);
      return resultItem;
    });
    console.log("Results   ========>",results);
    return results;
  } catch (error) {
    console.error('Error querying data from DynamoDB:', error);
    return null;
  }
}

exports.reset_json = (content) => {
    const data = JSON.stringify(content);
        fs.writeFile("../Resources/Bookjson.json", data, err=>{
            if(err){
                console.log("Error writing file" ,err)
            } else {
                console.log('JSON data is written to the file successfully')
            }
        })
}