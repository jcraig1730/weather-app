const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./db/models/users.js');
const db = require('./db/index.js');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const axios = require('axios');

const authConfig = {
  domain: 'dev-l71xt3u6.auth0.com',
  audience: 'http://localhost:3002',
};

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256'],
});

app.post('/api/users/', (req, res) => {
  const { user } = req.body;
  db.createUser(user)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findUser(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

app.put('/api/users/:id', checkJwt, async (req, res) => {
  const { id } = req.params;
  const { updatedUserInfo } = req.body;
  const { home, otherLocations } = updatedUserInfo;
  const getHomeType = parseInt(home);
  if (getHomeType === 'number') {
    const city = await axios.get(`localhost:3003/api/citybyzip/${home}`);
    const zip = home;
    const newHome = { city, zip };
  }

  db.updateUser(id, updatedUserInfo)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.delete('/api/users/:id', checkJwt, (req, res) => {
  const { id } = req.params;
  db.deleteUser(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get('/api/external', checkJwt, (req, res) => {
  res.send({
    msg: 'Your Access Token was successfully validated!',
  });
});

app.listen(3002, () => console.log('users api running on port 3002'));
