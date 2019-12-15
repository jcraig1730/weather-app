const express = require('express');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, () => console.log('weather app runnin on port 3000'))
