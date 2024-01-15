import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Secret from './../model/Secret.js';
import Jwt from "jsonwebtoken";

// Post a secret
const PostSecret= asyncHandler( async (req, res) => {
  try {
    const { content } = req.body;
   
    const token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer") ?  req.headers.authorization.split(" ")[1] :null;
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.UserId;
     
    const user = await User.findById(userId);
   
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingSecret = await Secret.findOne({ userId });

    if (existingSecret) {
      return res
        .json({ message: "One User Can Post Only One Post" });
    }

    const newSecret = new Secret({ content, userId });
    await newSecret.save();

    res.status(201).json({ 
      success:true,
      message: "Secret posted successfully" 
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all secrets (without revealing user identity)
const getSecret= asyncHandler(async (req, res) => {
  try {
    const secrets = await Secret.find().select("-userId");
    res.status(200).json(secrets);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export {PostSecret,getSecret}
