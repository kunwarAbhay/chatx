const mongoose = require("mongoose");
const { isAlphanumeric, isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Provide a username!"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
  },
  bio: {
    type: String,
    default: "Sleeping...",
    trim: true,
  },
  avatar: {
    type: String,
    default: "profile-photos/default-avatar.png",
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    validate: {
      validator: isEmail,
      message: "Invalid email : Check again!",
    },
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: function (el) {
        return isAlphanumeric(el);
      },
      message: "Password must contain atleast one of these a-z, A-Z, 0-9",
    },
    select: false,
  },
  friends: {
    type: [
      {
        friend: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Please specify to whom you want to connect!"],
        },
        chatId: { type: String },
      },
    ],
  },
  groups: {
    type: [{ group: { type: Schema.Types.ObjectId, ref: "Group" } }],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, saltRounds);

  next();
});

userSchema.methods.checkPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
