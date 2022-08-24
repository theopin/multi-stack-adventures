const express = require("express");
const router = express.Router();
const controller = require("../controllers/accounts.controller");

router.route("/").post(controller.createAccount);

router.route("/:id").get(controller.getAccountById);
router.route("/").get(controller.getAccount);

router.route("/:id").delete(controller.deleteAccount);
router.route("/:id").patch(controller.updateAccount);

module.exports = router;
