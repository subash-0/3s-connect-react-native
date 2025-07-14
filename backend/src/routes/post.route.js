import  express  from 'express';
import { createPost, deletePost, getPosts, getSinglePost, getUserbasedPosts, likeAPost } from '../controllers/post.controller.js';
import { protectRoute } from './../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router()

// public route

router.get("/", getPosts)
router.get("/:postId",getSinglePost)
router.get("/user/:username", getUserbasedPosts)


//protectedRoutes

router.post("/", protectRoute,upload.single("image"),createPost);
router.post("/:postId/like",protectRoute,likeAPost)
router.delete("/:postId",protectRoute, deletePost);



export default router;
