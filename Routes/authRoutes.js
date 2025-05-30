const router = require("express").Router();
const authController = require("../Controller/authController");

router.post("/login", authController.login);
router.get("/secret",authController.getToken);

module.exports = router;
