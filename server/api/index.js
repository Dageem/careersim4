const express = require('express');
const router = express.Router();

router.use("/posts", require("./Post"))

module.exports = router;