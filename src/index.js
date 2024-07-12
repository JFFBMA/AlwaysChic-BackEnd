// console.log("hola mundo")
// const array=["1","2","3"]
// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
//   console.log(element);
// }

const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors");
const fetch = () => import("node-fetch").then (({default: fetch}) => fetch())

// settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 2)
app.use(
  cors({
    origin: "*", // Allow requests from all origins (replace with specific origin in production)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);

// middlewares
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/movies", require("./routes/movies"));
app.use("/api/users", require("./routes/users"));
app.use("/api/ejercicio", require("./routes/ejercicio"));

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});