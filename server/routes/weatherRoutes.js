const express = require("express");

const router = express.Router();

const {getTravelWeather} = require("../controllers/weatherController");

router.post("/travel",getTravelWeather);

module.exports = router;

