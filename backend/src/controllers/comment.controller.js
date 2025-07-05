
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


export const createComment = asyncHandler(async(req,res)=>{
  const {postId}= req.params;
  const {content}= req.body;
  const {userId} = getAuth(req);

  if(!content || content.trim() === "") return res.status(400).json({error:"Comment is required !"});

   const user = await User.findOne({clerkID:userId});
   const post = await Posts.findById(postId);

   if(!user || !post) return res.status(404).json({error:"Either Post or User not found !"});
   const comment  = await Comments.create({
    user: user._id,
    content,
    post: post._id,
   })

   if(!comment) res.status(400).json({error:"Something went wrong !"});
   await Posts.findByIdAndUpdate(postId,{
    $push: {comments: comment._id}
   })

   if(post.user.toString() !== user._id.toString()){
    await notification.create({
      from: user._id,
      to:post.user,
      post:postId,
      comment:comment._id
    })
   }

   res.status(200).json({comment})

})

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