const mongoose = require('mongoose');

const {mongoURI} = require("./keys")
// Connect to MongoDB

module.exports = () => {
    mongoose.connect( mongoURI)
        .then(()=> console.log("MongoDB Connected successfully! "))
        .catch(err =>console.log(err))

}