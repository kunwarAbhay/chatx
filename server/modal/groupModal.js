const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please Specify the group name"],
    trim: true,
  },
  description: {
    type: String,
    default: "We are together",
    trim: true,
  },
  dp: {
    type: String,
    default: "profile-photos/default-group-dp.png",
  },
  members: {
    type: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["member", "admin"] },
      },
    ],
  },
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
