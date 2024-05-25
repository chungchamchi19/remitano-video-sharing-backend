import express from "express";
import auth from "../modules/auth/controllers";
import asyncMiddleware from "../middlewares/async";

const router = express.Router();

router.post("/auth/login", asyncMiddleware(auth.login));
router.post("/auth/refresh-token", asyncMiddleware(auth.refreshToken));
router.post("/auth/logout", asyncMiddleware(auth.logout));

export default router;
