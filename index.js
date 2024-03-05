const express = require('express');
const app = express();
const axios = require("axios");
const { writeFile } = require('fs');

// app.get('/', (req, res) => {
//   res.send('Hello World!!');
// });

// create function

 // get all cat images
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

// Save the fetched cat images to JSON files for persistent storage.
function saveImageToJson(imageUrls) {
  const filePath = './catImages.json'

  const data = JSON.stringify(imageUrls, null, 2);

  writeFile(filePath, data, (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');
  });
 }

 // update function

 // delete function





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))