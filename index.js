const express = require('express');
const app = express();
const axios = require("axios");
const { writeFile } = require('fs');

// app.get('/', (req, res) => {
//   res.send('Hello World!!');
// });
 function saveImageToJson(imageUrls) {
  const filePath = './catImages.json'
  // figure out logic, use writeFile method 
 }
// get all cats
app.get('/cat-images', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15', {
      headers: {
        
      }
    });
    const imageUrls = response.data.map(cat => cat.url)
    saveImageToJson(imageUrls); // Save the image URLs to a JSON file
    res.send(imageUrls);
  } catch (error) {
    console.error(error);
    res.status(500).send('cant fetch cat image');
  }
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))