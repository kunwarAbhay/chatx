const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const Chat = require("../modal/chatModal.js");
const UnseenChat = require("../modal/unseenChatModal.js");
const LastMessage = require("../modal/lastMessageModal.js");
const GroupInvite = require("../modal/groupInviteModal.js");
const Group = require("../modal/groupModal.js");
const User = require("../modal/userModal.js");

exports.getAllChats = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  let user = await User.findById(id).populate([
    {
      path: "friends.friend",
      select: "username name chatId avatar",
    },
    { path: "groups.group", select: "name dp description" },
  ]);

  user = user.toJSON();

  const x = user.friends.map(async (friend) => {
    const lastMessage = await LastMessage.findOne({ chatId: friend.chatId });
    const UnseenChatCount = await UnseenChat.find({
      chatId: friend.chatId,
    }).count();

    return { ref: friend, lastMessage, UnseenChatCount };
  });

  const y = user.groups.map(async (group) => {
    const lastMessage = await LastMessage.findOne({ chatId: group._id });
    const UnseenChatCount = await UnseenChat.find({
      chatId: group._id,
    }).count();

    return { ref: group, lastMessage, UnseenChatCount };
  });

  const result = await Promise.all([...x, ...y]);
  // const resultFriend = await Promise.all(x);
  // const resultGroup = await Promise.all(y);

  // for (let i = 0; i < result.length; i++) {
  //   user.friends[i].lastMessage = result[i].lastMessage;
  //   user.friends[i].UnseenChatCount = result[i].UnseenChatCount;
  // }

  for (let i = 0; i < result.length; i++) {
    result[i].ref.lastMessage = result[i].lastMessage;
    result[i].ref.UnseenChatCount = result[i].UnseenChatCount;
  }

  user.groups.sort((a, b) => {
    const x = a.lastMessage ? a.lastMessage.updatedAt : 0;
    const y = b.lastMessage ? b.lastMessage.updatedAt : 0;
    return x - y;
  });

  user.friends.sort((a, b) => {
    const x = a.lastMessage ? a.lastMessage.updatedAt : 0;
    const y = b.lastMessage ? b.lastMessage.updatedAt : 0;
    return x - y;
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  /**
   * TODO
   * Promisify All
   */
  const newMessages = await UnseenChat.find({ chatId }).sort({ createdAt: -1 });
  const oldMessages = await Chat.find({ chatId }).sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    oldMessages,
    newMessages,
  });
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;
  const { type, category, message, sender, receiver } = req.body;

  const newMessage = await UnseenChat.create({
    type,
    category,
    message,
    chatId,
    sender,
    receiver,
  });

  const lastMessage = await LastMessage.updateOne(
    { chatId },
    {
      type,
      category,
      message,
      chatId,
      sender,
      receiver,
    },
    {
      upsert: true,
    }
  );

  /**
   * TODO
   * send the message to receiver through web socket
   * Mark the messages seen if receiver on connection
   * Remove those messages from UnseenChat
   */

  res.status(200).json({
    status: "success",
    message: newMessage,
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const { chatId } = req.params;

  const { deletedCount } = await Chat.deleteOne({ chatId });

  res.status(200).json({
    status: "success",
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const { name, dp } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("You are not logged in. Login again", 401));
  }

  const group = await Group.create({
    name,
    dp,
    members: [{ user: id, role: "admin" }],
  });

  user.groups = [...user.groups, group._id];
  await user.save();

  res.status(201).json({
    status: "success",
    group,
  });
});

exports.getGroupInviteToken = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;

  let invite = await GroupInvite.findOne({ group: groupId });

  if (!invite) {
    invite = await GroupInvite.create({ group: groupId });
  }

  res.status(200).json({
    status: "Success",
    token: invite._id,
  });
});

exports.resetToken = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;

  await GroupInvite.deleteOne({ group: groupId });

  let invite = await GroupInvite.create({ group: groupId });

  res.status(200).json({
    status: "Success",
    token: invite._id,
  });
});

exports.joinGroup = catchAsync(async (req, res, nex8t) => {
  const { id } = req.user;

  const user = await User.findById(id);
  const invite = await GroupInvite.findOne({ inviteToken: token });

  if (!user) {
    return next(new AppError("You are not logged in!, log in again!", 401));
  }

  if (!invite) {
    return next(new AppError("Link expired or invalid", 400));
  }

  user.groups.push(invite.group);

  await user.save();

  res.status(200).json({
    status: "success",
    user,
  });
});
