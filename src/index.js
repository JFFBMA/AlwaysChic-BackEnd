const express = require("express")
const morgan = require("morgan")
const cors = require("cors");
const fetch = () => import("node-fetch").then (({default: fetch}) => fetch())
const app = express()

// settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 2)  //en las respuestas de una API, JSON indentado a 2 espacios
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
app.use(express.urlencoded({ extended: false })); //convierte en un objeto que se acceder por req.body.
app.use(express.json());

// routes
app.use("/api/login", require("./routes/login"));
app.use("/api/usuarios", require("./routes/usuarios"));

// starting the server
app.listen(app.get("port"), () => { 
  console.log(`Server on port ${app.get("port")}`, new Date());
});