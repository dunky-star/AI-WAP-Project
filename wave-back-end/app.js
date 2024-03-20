const express = require('express');
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./config/db.config");
const app = express();
const chatRoutes = require('./routes/chatroute');

// Setting static folder for handling static resources.
app.use(express.static('public'));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));
//jwt token is setting in the cookie
app.use(
  cookieSession({
    name: "cookfood-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);


// Routes import
app.use(chatRoutes);
app.use(cors());
// simple route
app.get("/checkapp", (req, res) => {
  res.json({ message: "Welcome to cook food." });
});
// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.use((req, res, next) => {
  res.status(404).send('Oop! the resource not found');
});

app.use((err, req, res, next) => {
  console.log(err.toString());
  res.status(500).send('Oops! An error occurred');
});

// it is for mongo DB connection
const db = require("./models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.listen(3000, () =>
  console.log('Server started and listening to requests on port 3000')
);
