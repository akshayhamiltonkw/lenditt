const router = require("express").Router();
const { getData } = require("../controller/filterContact");

router.get("/getData", getData);

module.exports = router;
