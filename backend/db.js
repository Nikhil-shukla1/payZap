const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password is too small"],
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50, //using the elegant solution having more detail
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
module.exports = { User, Account };
