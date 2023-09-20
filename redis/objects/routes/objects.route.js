import Router from 'express';
const router = Router();

import { insertData, getDataFromDatabase, getDataFromRedis} from '../controllers/objects.controller.js';


router.route("/").get(insertData);
router.route("/database").get(getDataFromDatabase);
router.route("/redis").get(getDataFromRedis);

export default router;