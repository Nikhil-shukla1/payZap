const { Router } = require("express");
const { z } = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");

const { authMiddleware } = require("./middleware");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router();
const signUpBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(6),
});
const signInBody = z.object({
  username: z.string().email(),
  password: z.string(),
});
const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
//sign up route
router.post("/", async (req, res) => {
  console.log("lol");
  return res.status(200).json({ message: "It works!" });
});
router.post("/signup", async (req, res) => {
  try {
    const { success } = signUpBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs!",
      });
    }
  } catch (e) {
    return res.status(500).json({ msg: e });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "User already exists!",
    });
  }
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = newUser._id;
  const newAccount = await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });
  const token = jwt.sign({ userId }, JWT_SECRET);
  return res.status(201).json({
    message: "User created successfully!",
    token: token,
  });
});


//sign in route
router.post("/signin", async (req, res) => {
  const { success } = signInBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect format of email/password",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }
  const userId = user._id;
  const token = jwt.sign({ userId }, JWT_SECRET);
  return res.status(200).json({
    token: token,
  });
});


//user update route
router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res
      .status(411)
      .json({ message: "Error while updating information!" });
  }
  const userId = req.userId;
  console.log("userId2 " + userId);
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    return res
      .status(200)
      .json({ message: "User details updated successfully!" });
  } catch (e) {
    return res
      .status(411)
      .json({ message: "Error while updating information!" });
  }
});


//get all users route
router.get("/bulk", async (req, res) => {
  console.log("bulk req");
  const filter = req?.query?.filter || "";
  
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: new RegExp(filter, "i") } }, //i stands for case insensitive
        { lastName: { $regex: new RegExp(filter, "i") } },
      ],
    });
    const usersWithoutPassword = users.map((user) => {
      return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      };
    });
    return res.status(200).json({
      users: usersWithoutPassword,
    });
  } catch (e) {
    return res.status(400).json({ message: "Error retrieving users!" });
  }
});

module.exports = router;
