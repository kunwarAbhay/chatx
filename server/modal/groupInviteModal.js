const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupInvite = new Schema({
  group: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Group",
  },
});

const GroupInvite = mongoose.model("GroupInvite", groupInvite);
module.exports = GroupInvite;
