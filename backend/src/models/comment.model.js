import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    post:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post"
    },
    contetn: {
      type: String,
      required:true,
      maxLength: 280,
    },
   
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comment", commentSchema)

export default Comments;