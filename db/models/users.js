const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  home: String,
  otherLocations: [String]
});

module.exports = mongoose.model("User", userSchema);
