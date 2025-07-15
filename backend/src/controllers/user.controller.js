
import asyncHandler from 'express-async-handler'
import userModel from "../models/user.model.js"
import Notifications from "../models/notification.model.js"
import { clerkClient, getAuth } from '@clerk/express';
export const getUserProgile = asyncHandler(async(req,res)=>{
  const {username} = req.params();
  const user = await userModel.find({username});

  if(!user) return res.status(404).json({error:"user not found"})

    res.status(200).json({user})


})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, bio, location } = req.body;
  const { userId } = getAuth(req);         // whatever auth gives you

  const user = await userModel.findOneAndUpdate(
    { clerkID: userId },                   // or whatever your auth ID is
    { firstName, lastName, bio, location },
    { new: true }                          // return the updated doc
  );

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({ user });
});

export const sysncUser = asyncHandler(async(req,res)=>{
  const {userId} = getAuth(req);
  const existingUser = await userModel.findOne({clerkID:userId})
  if(existingUser) return res.status(200).json({user:existingUser,message:"User already existed!"})

  const clerkUser = await clerkClient.users.getUser(userId);
  const userData = {
    clerkID: userId,
    email: clerkUser.emailAddresses[0].emailAddress,
    firstName : clerkUser.firstName || "",
    lastName :clerkUser.lastName || "",
    username: clerkUser.emailAddresses[0].emailAddress.split('@')[0],
    profilePicture: clerkUser.imageUrl || ""
  }

  const user = await  userModel.create(userData);
  res.status(200).json({user:user, message:"User created Successfully!"})

})

export const getCurrentUser = asyncHandler(async (req,res)=>{
   const {userId} = getAuth(req)
  const user = await userModel.find({clerkID : userId});

  if(!user) return res.status(404).json({error:"user not found"})

    res.status(200).json({user})


})

export const followUser = asyncHandler(async (req,res)=>{
  const {userId} = getAuth(req);
  const {targetUserId} = req.params();

  if(userId === targetUserId) return res.status(400).json({error:"You can't follow Yourself"})

  const currentUser = await userModel.findOne({clerkID: userId});
  const targetUser = await userModel.findById(targetUserId);
  if(!currentUser || targetUser) return res.status(404).json({error:"User not found"});

  const isFollowing = currentUser.following.includes(targetUserId);
  if(isFollowing)
  {
    await userModel.findByIdAndUpdate(currentUser._id,{
      $pull: {following:targetUser}
    }) 
    await userModel.findByIdAndUpdate(targetUserId,{
      $pull: {followers: currentUser._id}
    })
  }else {
    await userModel.findByIdAndUpdate(currentUser._id,{
      $push: {following:targetUser}
    }) 
    await userModel.findByIdAndUpdate(targetUserId,{
      $push: {followers: currentUser._id}
    })

  }

  await Notifications.create({
    from: currentUser._id,
    to: targetUserId,
    types: "follow"
  });

  res.status(200).json({
    message: isFollowing ? `User Unfollowed Successfully !`:`User followed Successfully !`
  })


})