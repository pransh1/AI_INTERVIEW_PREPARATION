const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5678;


//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
const routes = require("./routes/userRoutes.js");
app.use("/api/user", routes);


// dashboard
app.get("/", (req, res) => {
  res.send("AI Interview Backend is running 🚀");
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} `);
});


// END
