const mongoose = require("mongoose");
const { Schema } = mongoose;

const uniqueChatSchema = new Schema({
  friend: { type: [String] },
});

const UniqueChat = mongoose.model("UniqueChat", uniqueChatSchema);
module.exports = UniqueChat;
