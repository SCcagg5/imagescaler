const express = require('express');
const sharp = require('sharp');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '50mb' })); // pour permettre de récupérer des images en base64

app.post('/double-resolution', async (req, res) => {
  try {
    const inputImage = Buffer.from(req.body.image, 'base64'); // récupère l'image en base64
    const image = await sharp(inputImage).resize({ width: '200%' }).toBuffer(); // double la résolution de l'image
    const base64Image = image.toString('base64'); // convertit l'image en base64
    res.json({ image: base64Image }); // renvoie l'image en base64
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
