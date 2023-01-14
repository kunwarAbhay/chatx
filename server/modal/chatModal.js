const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "img", "gif", "file"],
    },
    category: {
      type: String,
      enum: ["one-to-one", "group"],
    },
    message: {
      type: String,
      required: [true, "Please add some message!"],
      trim: true,
    },
    chatId: {
      type: String,
      required: [true, "Please specify the chat"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please specify the sender"],
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [
        function () {
          if (this.category === "group") {
            this.receiver = "";
          }
          return this.category === "one-to-one";
        },
        "Please specify the receiver",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
