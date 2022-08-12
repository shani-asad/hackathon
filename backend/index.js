const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shaniasad:secre7@cluster0.vp4fu.mongodb.net/?retryWrites=true&w=majority"
); 

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to backend service");
});

app.get("/db/status", (req, res) => {
  const status = ["disconnected", "connected", "connecting", "disconnecting"];
  res.json(status[mongoose.connection.readyState]);
});

app.use((req, res) => {
  res.status(404).send("<h1> Endpoint not found.</h1>");
});

app.listen(3000, () => {
  console.log("server listening on http://localhost:3000.");
});
