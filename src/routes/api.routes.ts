import { Router } from "express";
import { getBirthApplications } from "../controllers/api/server.controllers";

const router = Router();

router.get("/birth_applications", getBirthApplications);

export default router;
