const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");

// 1. Create a signup route expect username , password , firstName , lastName.
const signupBody = zod.object({
  username: zod.email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async function (req, res) {
  const { username, password, firstName, lastName } = req.body;

  const validatePayload = signupBody.safeParse({
    username,
    password,
    firstName,
    lastName,
  });

  if (!validatePayload.success) {
    res.status(411).json({
      msg: "Incorrect input",
    });
    return;
  }

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    res.status(409).json({
      msg: "Email Already Taken / Provide Another one",
    });
    return;
  }

  const user = await User.create({ username, password, firstName, lastName });

  const userId = user._id;

  // Create Random Account Balance.
  await Account.create({
    userId: userId,
    balance: 1000 * Math.random() + 1,
  });

  // Create jwt token based on id.
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(201).json({
    msg: "User Signup Sucessfull",
    token: token,
  });
});

// 2. Create a signin route exprect username , password.
const signinBody = zod.object({
  username: zod.email(),
  password: zod.string(),
});

router.post("/signin", async function (req, res) {
  console.log("Recived")
  const { username, password } = req.body;

  const validatePayload = signinBody.safeParse({
    username,
    password,
  });

  if (!validatePayload.success) {
    res.status(411).json({
      msg: "Incorect Inputs / provide correct one",
    });
    return;
  }

  const existUser = await User.findOne({ username, password });

  if (!existUser) {
    res.status(411).json({
      msg: "User does not exist",
    });
    return;
  }

  // Create token and return.
  const userId = existUser._id;

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    token: token,
  });
});

// 3. Create a update details route expect username , firstName , lastName Body what you have to update.
const updateDetail = zod.object({
  username: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.patch("/update", authMiddleware, async function (req, res) {
  const { success } = updateDetail.safeParse(req.body);
  const userId = req.userId;

  if (!success) {
    res.status(411).json({
      msg: "Error while updating",
    });
    return;
  }

  const user = await User.findByIdAndUpdate(userId, req.body, {
    returnDocument: "after",
  });

  res.status(200).json({
    msg: "User updated sucesfull",
    user,
  });
});

router.get("/bulk", async function (req, res) {
  const filter = req.query.filter || "";

  const user = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options : "i"
        },
      },
      {
        lastName : {
            $regex : filter,
            $options  : "i"
        }
      }
    ],
  });

  

  res.json({
    users : user.map(user => ({
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName,
        id : user._id

    }))
  })


});

module.exports = router;
