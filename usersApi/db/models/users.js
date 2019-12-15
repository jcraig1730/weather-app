const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  home: { city: { type: String }, zip: { type: String } },
  otherLocations: [{ city: { type: String }, zip: { type: String } }],
});

module.exports = mongoose.model('User', userSchema);
