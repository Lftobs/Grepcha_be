const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const app = express();

var corsOptions = {
  origin:'*',
  credentials:true
};

app.use(cors(corsOptions));

app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// connection to db
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my test backend application." });
});

require("./app/routes/products.routes")(app)
require("./app/routes/auth.routes")(app)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
