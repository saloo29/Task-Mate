import dotenv from "dotenv";
dotenv.config();

import * as z from "zod";
import bcrypt from "bcrypt";
import { Router } from "express";
import { User} from "../data/store.js"
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";

const secret = process.env.JWT_SECRET;

const usersRoutes = Router();

usersRoutes.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  
  const requireBody = z.object({
    email : z.string().email("Invalid email address, please add correct email address"),
    password: z.string().min(6).max(16),
    username: z.string().min(6).max(14),
  }) 

  const parsedUserDetails = requireBody.safeParse(req.body);

  if (!parsedUserDetails.success) {
    return res.status(400).json({
      message: "Required fields missing"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 6);

  try{
    await User.create({
      email: email,
      password: hashedPassword,
      username: username
    })
    res.status(200).json({ message: "Successfully signed up" })
  } catch(e) {
    return res.status(401).json({
      message: "Signup failed",
      error: e.message
    })
  }
})

usersRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await User.findOne({ email });

  if(!existingUser) {
    return res.status(404).json({
      message: "Email not found"
    })
  }

  const matchPassword = await bcrypt.compare(password, existingUser.password);

  if(matchPassword){
    const token = jwt.sign({
      id : existingUser._id.toString()
    }, secret, {expiresIn: "1hr"})
    res.status(200).json({
      token: token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      }
    })
  } else {
    return res.status(400).json({
      message: "Passwords does not match"
    })
  }
})

usersRoutes.get("/me", auth, async (req, res) => {
  
  try {
    const currentUser = await User.findById(req.userId).select("-password");
    return res.status(200).json(currentUser);
  } catch(e) {
    return res.status(401).json({
      message: "User does not exits"
    });
  }
})

export default usersRoutes;