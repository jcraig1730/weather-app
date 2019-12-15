const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
app.use(cors());

app.get('/api/citybyzip/:zip', async (req, res) => {
  const { zip } = req.params;
  const zipOrError = await db.getCity(zip);
  res.json(zipOrError);
});

app.get('/api/zipbycity/:city', async (req, res) => {
  const { city } = req.params;
  db.getZip(city)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(data));
});

app.get('/api/coordsbyzip/:zip', async (req, res) => {
  const { zip } = req.params;
  db.getCoords(zip)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});


app.listen(3003, () => console.log('zip server listening on port 3003'));
