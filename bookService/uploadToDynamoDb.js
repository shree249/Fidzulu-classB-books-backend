const AWS = require('aws-sdk');
const async = require('async');
require('dotenv').config();
// Configure your AWS credentials
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

 

const docClient = new AWS.DynamoDB.DocumentClient();


const jsonData =[
    {
      "productId": 8001,
      "productName": "The Lord of the Rings",
      "price": 25.99,
      "productDescription": "The Lord of the Rings is a high-fantasy epic novel written by English author and scholar J.R.R. Tolkien. It is one of the most renowned works in the fantasy genre, set in the fictional world of Middle-earth.",
      "rating": 4.8,
      "imageUrl": "https://i.ebayimg.com/images/g/JoMAAOSwug1ksZHw/s-l500.jpg",
      "author": "J.R.R. Tolkien",
      "publisher": "Houghton Mifflin Harcourt",
      "format": "Hardcover",
      "language":"English"
    },
    {
      "productId": 8002,
      "productName": "The Enigmatic Chronicles",
      "price": 29.99,
      "productDescription": "The Enigmatic Chronicles is a thrilling fantasy novel that follows the journey of a young hero destined to save the world from ancient evil. With unexpected plot twists and a vividly imagined world, readers will be captivated from beginning to end.",
      "rating": 4.9,
      "imageUrl": "https://m.media-amazon.com/images/I/91sjWP6mdDL._SL1500_.jpg",
      "author": "A. R. Writer",
      "publisher": "Fantasy Press",
      "format": "Hardcover",
      "language": "English"
    },
    {
      "productId": 8003,
      "productName": "Echoes of Silence",
      "price": 24.99,
      "productDescription": "Echoes of Silence is a deeply moving novel exploring love, loss, and the human spirit. The poetic narrative weaves a poignant story of interconnected lives and the universal quest for meaning in a complex world.",
      "rating": 4.8,
      "imageUrl": "https://m.media-amazon.com/images/I/91bYioKtOSL._SY385_.jpg",
      "author": "S.. M. Poet",
      "publisher": "Verse Publications",
      "format": "Paperback",
      "language": "English"
    },
    {
        "productId": 8004,
        "productName": "To Kill a Mockingbird",
        "price": 12.99,
        "productDescription": "To Kill a Mockingbird is a classic novel written by Harper Lee. The story explores themes of racial injustice, moral growth, and compassion through the eyes of young Scout Finch in the American South.",
        "rating": 4.7,
        "imageUrl": "https://m.media-amazon.com/images/I/51Z9p5AecCL._SY445_SX342_.jpg",
        "author": "Harper Lee",
        "publisher": "Harper Perennial Modern Classics",
        "format": "Paperback",
        "language": "English"
      },
      {
        "productId": 8010,
        "productName": "Serenity Within Chaos",
        "price": 22.99,
        "productDescription": "Serenity Within Chaos is a compelling drama that navigates the complexities of relationships, resilience, and personal growth. Through authentic characters and emotional depth, it explores the human ability to find peace amidst life’s turmoil.",
        "rating": 4.6,
        "imageUrl": "https://m.media-amazon.com/images/I/41Mg0cst-wL._SY445_SX342_.jpg",
        "author": "L. R. Dramatist",
        "publisher": "Drama House",
        "format": "Paperback",
        "language": "English"
      },
      {
        "productId": 8005,
        "productName": "The Art of Time Travel",
        "price": 27.99,
        "productDescription": "The Art of Time Travel is a thought-provoking non-fiction book that delves into the history and philosophy of time travel concepts. It explores the evolution of time travel ideas and their impact on literature, science, and popular culture.",
        "rating": 4.7,
        "imageUrl": "https://m.media-amazon.com/images/I/91pLOw3RTsL._SY385_.jpg",
        "author": "T. H. Historian",
        "publisher": "Temporal Books",
        "format": "Hardcover",
        "language": "English"
      },
      {
      "productId": 8006,
      "productName": "Emerald Whispers: Tales of Ireland",
      "price": 21.99,
      "productDescription": "Emerald Whispers: Tales of Ireland is a collection of enchanting stories that showcase the beauty and magic of Ireland. From ancient legends to modern-day adventures, readers will be transported to the lush landscapes and rich culture of the Emerald Isle.",
      "rating": 4.6,
      "imageUrl": "https://m.media-amazon.com/images/I/711l3wQR1PL._SY385_.jpg",
      "author": "Siobhán O'Connor",
      "publisher": "Celtic Press",
      "format": "Paperback",
      "language": "English"
    },
    {
      "productId": 8007,
      "productName": "Celtic Mysteries: Unveiling Ireland's Secrets",
      "price": 18.99,
      "productDescription": "Celtic Mysteries: Unveiling Ireland's Secrets is a captivating exploration of ancient Irish folklore and mysteries. Delve into the hidden world of Celtic legends, mythical creatures, and ancient rituals that have shaped Ireland's cultural identity throughout the ages.",
      "rating": 4.7,
      "imageUrl": "https://blackwells.co.uk/jacket/500x500/9780500810569.webp",
      "author": "Eoin O'Sullivan",
      "publisher": "Irish Heritage Publishing",
      "format": "Hardcover",
      "language": "English"
    },
    {
        "productId": 8008,
        "productName": "Madhushala",
        "price": 174.96,
        "productDescription": "Madhushala, as a work, contributed highly to 20th-century Hindi literature. Madhushala is one of the books of a trio by Harivansh Rai Bachchan. It contains 135 Rubai, which verses of four lines.",
        "rating": 4.5,
        "imageUrl": "https://m.media-amazon.com/images/I/71VVm4pMYvL._AC_UY218_.jpg",
        "author": "Harivansh Rai Bachchan",
        "publisher": "Rajpal & Sons",
        "format": "Hardcover",
        "language": "Hindi"
      },{
          "productId": 8009,
        "productName": "Chanakya Neeti",
        "price": 122.00,
        "productDescription": "Chanakya Neeti is a book based on Chanakya, an Indian theorist, teacher, philosopher, economist and a noble mentor to the Mauryan emperors between 350 -275 BC. The book portrays about his ideologies and ideas in diverse situations.",
        "rating": 4.4,
        "imageUrl": "https://m.media-amazon.com/images/I/41hcRNUhXOL._SY445_SX342_.jpg",
        "author": "Ashwini Parashar",
        "publisher": "Diamond Pocket Books",
        "format": "Hardcover",
        "language": "Hindi"
      }
      ]

// DynamoDB table name
const tableName = 'fz_books';


// Function to upload data to DynamoDB
function uploadToDynamoDB(item, callback) {
  const params = {
    TableName: tableName,
    Item: item,
  };

 

  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Uploaded:', item.productId);
    }

 

    callback(err, data);
  });
}

 

// Use the async library to upload the data in parallel
async.each(
  jsonData,
  uploadToDynamoDB,
  (err) => {
    if (err) {
      console.error('One or more items failed to upload.');
    } else {
      console.log('All items uploaded successfully.');
    }
  }
);