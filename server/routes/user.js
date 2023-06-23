import express from "express";
import {  login, register, success } from "../controllers/user.js";
const router = express.Router();
// router.get("/signup",register)
router.post("/api/signup",register)

router.post("/api/login",login)
router.get("/api/success",success)
export default router;
        