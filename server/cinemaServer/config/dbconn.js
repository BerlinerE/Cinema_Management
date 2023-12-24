const mongoose = require("mongoose");


const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/usersDB')
    .then(() => console.log('Connected to usersDB!'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;




