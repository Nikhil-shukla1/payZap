const { Router } = require("express");
const { authMiddleware } = require("./middleware");
const { Account } = require("../db");
const { z } = require("zod");
const mongoose = require("mongoose");

const router = Router();

const transferBody = z.object({
  to: z.string(),
  amount: z.number().gt(0),
});

//endpoint to get balance for user
router.get("/balance", authMiddleware, async (req, res) => {
  console.log("balance");
  try {
    console.log("userId : " + req.userId);
    const account = await Account.findOne({ userId: req.userId });
    return res.status(200).json({ balance: account.balance });
  } catch (e) {
    res.status(400).json({ message: "Error retrieving balance!" });
  }
});
//endpoint for money transfer from account to another account
//this needs to have transactions for atomicity
router.post("/transfer", authMiddleware, async (req, res) => {
  const { success } = transferBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: "Error in inputs!" });
  }
  //first solve without using transactions,which should be simple to implement
  try {
    
    const session = await mongoose.startSession();
    session.startTransaction();
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < req.body.amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance!" });
    }

    const toAccount = await Account.findOne({ userId: req.body.to }).session(
      session
    );
    if (!toAccount) {
      return res.status(400).json({ message: "Invalid account" });
    }
    await Account.updateOne(
      { userId: req.userId },
      {
        $inc: {
          balance: -req.body.amount,
        },
      }
    ).session(session);
    await Account.updateOne(
      { userId: req.body.to },
      { $inc: { balance: req.body.amount } }
    ).session(session);
    await session.commitTransaction();
    return res.status(200).json({ message: "Transfer successful!" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Transfer unsuccessful" });
  }
});

module.exports = router;
