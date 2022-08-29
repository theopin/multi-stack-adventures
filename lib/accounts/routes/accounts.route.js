const express = require("express");
const router = express.Router();
const controller = require("../controller/accounts.controller");

router.route("/").post(controller.createAccount);

router.route("/:id").get(controller.getAccountById);
router.route("/").get(controller.getAccounts);

router.route("/:id").delete(controller.deleteAccount);
router.route("/:id").patch(controller.updateAccount);

module.exports = router;