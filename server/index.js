const express = require("express");
const cors = require("cors");
require("dotenv").config();

const roadmapRoute = require("./routes/roadmap");
const nudgeRoute = require("./routes/nudge");


const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/roadmap", roadmapRoute);
app.use("/api/nudge", nudgeRoute);


app.listen(5000, () => {
    console.log("Server running on port 5000");
});