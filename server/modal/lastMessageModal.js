const mongoose = require("mongoose");
const { Schema } = mongoose;

const lastMessageSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "img", "gif", "file"],
    },
    message: {
      type: String,
      required: [true, "Please add some message!"],
      trim: true,
    },
    chatId: {
      type: String,
      unique: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const LastMessage = mongoose.model("LastMessage", lastMessageSchema);
module.exports = LastMessage;
