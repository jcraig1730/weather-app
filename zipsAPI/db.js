const mysql = require('mysql');
const { mysqlConfig } = require('../keys.js');

const db = mysql.createConnection(mysqlConfig);

// Get city by zipcode
const getCity = (zip) => new Promise((resolve, reject) => {
  db.query('SELECT city FROM zips WHERE zip = ?', [zip], (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

// Get zip by city
const getZip = (city) => new Promise((resolve, reject) => {
  db.query('SELECT zip FROM zips WHERE city = ?', [city], (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const getCoords = (zip) => new Promise((resolve, reject) => {
  db.query('SELECT lat, lng FROM zips WHERE zip = ?', [zip], (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});


module.exports = {
  getCity,
  getZip,
  getCoords,
};
