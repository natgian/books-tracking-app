import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Server is working!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});
