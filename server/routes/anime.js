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

router.get("/info/:id", async (req, res) => {
  const provider = ["gogoanime", "anify", "zoro"];
  try {
    const id = req.params.id;
    const promises = provider.map(async (p) => {
      try {
        const response = await axios.get(`${baseURL}/info/${id}?provider=${p}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    });

    const response = await Promise.any(promises);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/watch/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseURL}/watch/${id}`);
    res.json(response.data.sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
