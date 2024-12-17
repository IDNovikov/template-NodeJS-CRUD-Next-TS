const Router = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const authMiddleWare = require("../middleWare/authMiddleWare");

router.post("/login", adminController.login);
router.post("/registration", adminController.registration);
router.get("/auth", authMiddleWare, adminController.check);

module.exports = router;
