const express = require("express");
const path = require("path");
const { connection } = require("./db");
const { passengerRouter } = require("./routes/passenger.routes");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", passengerRouter);
app.listen(8080, async () => {
  await connection;
  console.log(`${8080} running the port`);
});
