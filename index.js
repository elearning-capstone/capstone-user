const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// health check
app.get("/", (req, res) => {
  res.json({ message: "health check ok" });
});

app.use("/user", require("./routes/user"));
app.use("/course", require("./routes/course"));
app.use("/comment", require("./routes/comment"));
app.use("/review", require("./routes/review"));

// set port, listen for requests
const PORT = 3000;
db.sequelize.sync().then((req) => {
    app.listen(PORT, () => console.log(`Backend started on port ${PORT}`))
});