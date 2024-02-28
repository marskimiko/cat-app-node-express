const express = require('express');
const app = express();
const axios = require("axios");

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

// app.get('https://cdn2.thecatapi.com/images', (req, res) => {
//   res.send();
// });

app.get('/cat-image', async (req, res) => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15', {
      
    });
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('cant fetch cat image');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))