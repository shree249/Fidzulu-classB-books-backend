
const path= require('path');
// const rootPath= path.resolve(__dirname, '../../');
const fs = require('fs');
const filepath=path.resolve('./resources/Bookjson.json');
const getAllDataFromDynamoDB = require('./daoImpl');

let read_json_file = () =>{
    return fs.readFileSync(filepath);
}

exports.list = () =>{
    return JSON.parse(read_json_file());
}


exports.query_by_arg = async(value) =>{
    if(value !== "US-NC" && value!=="IE" && value!="IN"){
        return null;
    }

     try {
    // Use the asynchronous DAO function to get data from DynamoDB
    const data = await getAllDataFromDynamoDB();
    // Process the data based on the location value
    const results = data.map((item) => {
      const resultItem = { ...item };
      console.log("CHECKING PRIZE",resultItem.price);
        if(value === "US-NC"){
            resultItem.price *= 1.08;
        }else if(value === "IE"){
            resultItem.price *= 1.23;
            resultItem.price*=0.94;
        }else if(value === "IN"){
            resultItem.price *= 1.18;
            resultItem.price*=83.00;
        }
        resultItem.price=parseFloat(resultItem.price.toFixed(2));
      return resultItem;
    });
    return results;
  } catch (error) {
    console.log("From json");
    console.error('Error querying data from DynamoDB:', error);
    return this.query_by_arg_json(value);
  }
}

exports.post_book = (books) => {
    if (books.hasOwnProperty("productId") && books.hasOwnProperty("productName") && books.hasOwnProperty("price") &&
     books.hasOwnProperty("productDescription") && books.hasOwnProperty("rating") && books.hasOwnProperty("imageUrl") && books.hasOwnProperty("author") && books.hasOwnProperty("publisher")&& books.hasOwnProperty("format") && books.hasOwnProperty("language") && Object.keys(books).length == 10) {
        let results = JSON.parse(read_json_file());
        results[results.length] = books;
        const data = JSON.stringify(results);
        fs.writeFile("../Resources/Bookjson.json", data, err=>{
            if(err){
                console.log("Error writing file" ,err)
            } else {
                console.log('JSON data is written to the file successfully')
            }
        })
        return books;
    }
    return null;
}

exports.query_by_arg_json = (value) =>{
    if(value !== "US-NC" && value!=="IE" && value!="IN"){
        return null;
    }
    let results = JSON.parse(read_json_file());
    console.log("Query by location" + value);
    console.log(results);
    for(let i =0; i < results.length; i++){
        console.log("CHECKING PRIZE",results[i].price);
        if(value === "US-NC"){
            results[i].price *= 1.08;
        }else if(value === "IE"){
            results[i].price *= 1.23;
            results[i].price*=0.95;
        }else if(value === "IN"){
            results[i].price *= 1.18;
            results[i].price*=83.00;

        }

        results[i].price=parseFloat(results[i].price.toFixed(2));
        // results[i].price = Double(results[i].price.toFixed(2));
       // results[i].price = results[i].price.toFixed(2); 
        // console.log("UPDATING PRIZE",results[i].price);
    }
    // console.log(results);
    return results;
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