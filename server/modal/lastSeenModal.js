const mongoose = require("mongoose");
const { Schema } = mongoose;

const lastSeenSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const LastSeen = mongoose.model("LastSeen", lastSeenSchema);
module.exports = LastSeen;
