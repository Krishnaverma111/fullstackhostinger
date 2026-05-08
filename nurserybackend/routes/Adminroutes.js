const express = require("express");

const router = express.Router();

const adminLogin = require("../controllers/AdminLogin");

router.post("/login", adminLogin);

module.exports = router;