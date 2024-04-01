const axios = require("axios");
const express = require("express");
const router = express.Router();

const baseURL = "https://zenkai-api.vercel.app/meta/anilist";

router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/trending`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
