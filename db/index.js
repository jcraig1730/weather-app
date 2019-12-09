const mongoose = require("mongoose");
const User = require("./models/users.js");

mongoose.connect("mongodb://localhost/weatherUsers", { useNewUrlParser: true });

const createUser = userInfo => {
  return new Promise((resolve, reject) => {
    const newUser = new User(userInfo);
    newUser
      .save()
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const findUser = id => {
  return new Promise((resolve, reject) => {
    User.findOne({ id })
      .then(user => resolve(user))
      .catch(err => reject(err));
  });
};

const updateUser = (id, updatedUserInfo) => {
  console.log(id, updatedUserInfo);
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ id }, updatedUserInfo)
      .then(data => resolve(data))
      .catch(err => reject({ err }));
  });
};

const deleteUser = id => {
  return new Promise((resolve, reject) => {
    User.findOneAndDelete({ id })
      .then(() => resolve({ success: true }))
      .catch(err => reject(err));
  });
};

module.exports = { createUser, findUser, updateUser, deleteUser };
