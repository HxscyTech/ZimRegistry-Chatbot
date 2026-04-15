import { Router } from "express";
import { verifyWebhookToken } from "../controllers/whatsapp/verifyWebhook";
import { incomingMessages } from "../controllers/messages/incomingMessages";
import { flowsHandler } from "../controllers/flows/index"

const router = Router();

router.route("/webhook").get(verifyWebhookToken()).post(incomingMessages);
router.route("/flows").post(flowsHandler)

export default router;