const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect('mongodb://localhost/nodejsAPI', { useNewUrlParser: true });
    mongoose.connection.on("open", () => {
        console.log("MongoDB başarılı!");
    });
    mongoose.connection.on("error", (err) => {
        console.log("MongoDB başarısız! ", err);
    });
    mongoose.Promise = global.Promise; // promise yapısını kullanmak istedik
};