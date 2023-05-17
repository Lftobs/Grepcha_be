const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("./products.model.js")(mongoose);
db.users = require("./auth.model.js")(mongoose);

module.exports = db;
