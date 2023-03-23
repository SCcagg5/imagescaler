const express = require('express');
const sharp = require('sharp');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.post('/double-resolution', async (req, res) => {
  try {
    const inputImage = Buffer.from(req.body.image, 'base64'); 
    sharp(inputImage)
    .resize({ width: 200})
    .toBuffer((err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error processing image');
      } else {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Content-Length', data.length);
        res.end(data);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
