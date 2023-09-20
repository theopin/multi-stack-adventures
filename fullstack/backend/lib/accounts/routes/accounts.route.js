import Router from 'express';
import { createAccount, authenticateAccount, logoutAccount, getHealthStatus, getAccountById, getAccounts, deleteAccount, updateAccount } from "../controller/accounts.controller.js";

const router = Router();

router.route("/").post(createAccount);
router.route("/auth").post(authenticateAccount);
router.route("/logout").post(logoutAccount);

router.route("/health").get(getHealthStatus);
router.route("/:id").get(getAccountById);
router.route("/").get(getAccounts);

router.route("/:id").delete(deleteAccount);
router.route("/:id").patch(updateAccount);

export default router;