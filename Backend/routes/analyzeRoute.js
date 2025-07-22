const express = require("express");
const router = express.Router();
const analyzeResume = require("../controllers/analyzeController");

router.post("/analyze", analyzeResume);

module.exports = router;
