const Router = require("express");
const router = new Router();

const productRouter = require("./productRouter");
const adminRouter = require("./adminRouter");

router.use("/products", productRouter);
router.use("/admins", adminRouter);

module.exports = router;
