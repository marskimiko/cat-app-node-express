const express = require('express');
const app = express();
app.use(express.json()); 
app.use(express.static('public'));

const axios = require("axios");
const { readFileSync, writeFileSync } = require('fs');
const { writeFile, readFile } = require('fs').promises;
const filePath = './catImages.json';


app.post('/cat-images', async (req, res) => {
  const newUrl = req.body.url;

  try {
    let data = readFileSync(filePath);
    let cats = JSON.parse(data);

    const newCatId = `cat_${cats.length + 1}`;

    const newCat = { id: newCatId, url: newUrl };
    cats.push(newCat);

    writeFileSync(filePath, JSON.stringify(cats, null));
    res.json(newCat);
  } catch (error) {
    console.error('error adding cat:', error);
  }
});

 // get all cat images
app.get('/cat-images', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15', {
      headers: {
        'x-api-key': ''
      }
    });

    const catData = response.data.map(cat => ({
      id: cat.id,
      url: cat.url
    }))
    saveImageToJson(catData)
    res.send(catData);
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

app.patch('/cat-image/:id', async(req, res) => {
  const id = req.params.id;
  const updatedUrl = req.body.url;
  try {
    const catData = await readFile(filePath);
    const images = JSON.parse(catData);
    
    const findImage = images.findIndex(image => image.id === id);
    images[findImage].url = updatedUrl;

    await writeFile(filePath, JSON.stringify(images, null));
    res.send('put request called')
  } catch (error){
    console.error('cannot edit image:', error)
  }
})

app.delete('/cat-image/:id', async(req, res) => {
  const id = req.params.id
  try {
    const catData = await readFile(filePath);
    const images = JSON.parse(catData);
    const filteredCats = images.filter(cat => cat.id !== id);

    await writeFile(filePath, JSON.stringify(filteredCats, null));
    res.send({ message: 'image deleted' });
  } catch (error) {
    console.error('cannot delete:', error);
  }

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))