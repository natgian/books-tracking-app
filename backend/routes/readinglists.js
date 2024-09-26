import express from "express";
const router = express.Router();

// GET all lists
router.get("/", (req, res) => {
  res.json({ mssg: "GET lists page" });
});

export default router;
