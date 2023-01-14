const mongoose = require("mongoose");
const { Schema } = mongoose;

const unseenChatSchema = new Schema(
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

const UnseenChat = mongoose.model("UnseenChat", unseenChatSchema);
module.exports = UnseenChat;
