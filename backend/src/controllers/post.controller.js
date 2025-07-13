import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import Comment from "../models/comment.model.js";
import { getAuth } from "@clerk/express";
import cloudinary from "../config/cloudinary.js";

// controllers/post.controller.js
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    // populates post.user  ↓ field name matches schema ("user")
    .populate('user', 'username firstName lastName profilePicture')
    // populates comment.user
    .populate({
      path: 'comments',
      populate: {
        path: 'user', // ← lower‑case, singular
        select: 'username firstName lastName profilePicture',
      },
    });

  res.status(200).json( posts );
});


export const getSinglePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const posts = await Post.findById(postId)
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  res.status(200).json({ posts });
});

export const getUserbasedPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ error: "User not found" });
  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username firstName lastName profilePicture",
      },
    });

  res.status(200).json({ posts });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile)
    return res.status(400).json({ error: "Post must have text or image" });

  const user = await User.findOne({ clerkID: userId });
  if (!user) return res.status(404).json({ error: "User not found !" });

  let imageUrl = "";

  if (imageFile) {
    try {
      // build base64 data‑URI
      const base64Image = `data:${
        imageFile.mimetype
      };base64,${imageFile.buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "3sConnect_posts",
        resource_type: "image",
        transformation: [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto" }, // q_auto
          { fetch_format: "auto" }, // f_auto
        ],
      });

      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      return res.status(400).json({
        error: error?.message || "Failed to upload file to Cloudinary",
      });
    }
  }

  const post = await Post.create({
    content: content || "",
    image: imageUrl,
    user: user._id,
  });

  res.status(201).json({ post });
});

export const likeAPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth();
  const { postId } = req.params;;
  const user = User.findOne({ clerkID: userId });
  const post = await Post.findById(postId);
  if (!user || post)
    return res.statusZ(404).json({ error: "Post or User not found !" });

  const isLiked = post.likes.includes(user._id);

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, {
      $pull: { likes: user._id },
    });
  } else {
    await Post.findByIdAndUpdate(postId, {
      $push: { likes: user._id },
    });
  }

  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      types: "like",
      post: postId,
    });
  }
  res.status(200).json({
    message: isLiked
      ? "Post unliked succesfully !"
      : "Post liked successfully !",
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;;
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkID: userId });
  const post = await Post.findById(postId);
  if (!user || !post)
    return res.status(400)?.json({ error: "  User or post not found !" });

  if (post.user.toString() !== user._id.toString())
    return res
      .status(403)
      .json({ error: "You can only delete your own post !" });
  await Comment.deleteMany(postId);
  await Post.findByIdAndDelete(postId);

  res.status(201).json({ message: "Post deleted Successfully !" });
});
