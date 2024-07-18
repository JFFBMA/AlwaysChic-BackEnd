const express = require("express")
const morgan = require("morgan")
const cors = require("cors");
const fetch = () => import("node-fetch").then (({default: fetch}) => fetch())
const app = express()

// settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 2)
app.use(
  cors({
    origin: "*", // Allow requests from all origins (replace with specific origin in production)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true
  })
);

// middlewares
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/login"));

// starting the server
app.listen(app.get("port"), () => { 
  console.log(`Server on port ${app.get("port")}`, new Date());
});