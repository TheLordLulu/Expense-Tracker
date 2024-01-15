const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const dotenv = require("dotenv");
const {readdirSync} = require('fs')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// Connect to MongoDB
db()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log("Listening to port:", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

