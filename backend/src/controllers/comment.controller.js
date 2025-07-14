
import  asyncHandler  from 'express-async-handler';
import Comments from '../models/comment.model.js';
import { getAuth } from '@clerk/express';
import User from './../models/user.model.js';
import Posts from '../models/post.model.js';
import notification from '../models/notification.model.js';

export const getComments = asyncHandler(async(req,res)=>{
  const {postId} = req.params;

  const comments = await Comments.find({post:postId}).sort({createdAta:-1}).populate("User","username firstName lastName profilePicture")
  if(!comments) return res.status(404).json({message : "No comments are found !"});

  res.status(200).json({comments})


})


export const createComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const { userId } = getAuth(req);           // <- use the logged‑in Clerk user

  if (!content?.trim())
    return res.status(400).json({ error: "Comment content is required!" });

  // Find the real user
  const user = await User.findOne({ clerkID: userId }); // ← use userId, not a hard‑coded string
  const post = await Posts.findById(postId);

  if (!user || !post)
    return res.status(404).json({ error: "Either post or user not found!" });

  // Create comment
  const comment = await Comments.create({
    user: user._id,
    content: content.trim(),
    post: post._id,
  });

  // Attach comment reference to the post
  await Posts.findByIdAndUpdate(
    postId,
    { $push: { comments: comment._id } },
    { new: true }
  );

  // Notify post owner (skip self‑notifications)
  if (!post.user.equals(user._id)) {
    await notification.create({
      from: user._id,
      to: post.user,
      post: post._id,
      comment:comment._id,
      types:"comment"
    });
  }

  return res.status(201).json({ comment });
});


export const deleteComment = asyncHandler(async(req,res)=>{
  const {userId} = getAuth(req);
  const {commentId} = req.params;
  

  const user = await User.findOne({clerkID:userId});

  const comment = await Comments.findById(commentId);

  if(!user || !comment) return res.status(404).json({error:"User or comment not found !"})

  if(comment.user.toString() !== user._id.toString()) return res.status(403).json({error: 'You can only delete your own comment'});

  await Posts.findByIdAndUpdate(comment.post,{
    $pull: {comments: comment._id}
  })

  await Comments.findOneAndDelete(comment._id);

  res.status(200).json({message:"Comment Deleted Successfull !"});
})  