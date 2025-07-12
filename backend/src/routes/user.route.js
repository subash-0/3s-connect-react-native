import express from "express";
import { followUser, getCurrentUser, getUserProgile, sysncUser, updateUserProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router()

router.get("/profile/:username",getUserProgile)
// update profile = auth

router.put("/profile", protectRoute, updateUserProfile);

router.post("/sync",protectRoute, sysncUser)
router.get("/me",protectRoute, getCurrentUser)
router.post("/follow/:targetUserId",protectRoute, followUser)

export default router;