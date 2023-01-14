const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/appError.js");
const User = require("../modal/userModal.js");
const UniqueChat = require("../modal/uniqueChatModal.js");
const LastSeen = require("../modal/lastSeenModal.js");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).select("+password");

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.user.id;

  const { deletedCount } = await User.deleteOne({ _id: id });

  if (!deletedCount) return next(new AppError("User Does not Exists", 400));

  res.status(200).json({
    status: "success",
  });
});

exports.getUserByUsername = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const user = await User.findOne({ username });

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.searchUsername = catchAsync(async (req, res, next) => {
  const username = req.params.username;
  const users = await User.find({ $username: { $search: `\'${username}\'` } });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.searchName = catchAsync(async (req, res, next) => {
  const name = req.params.name;
  const users = await User.find({ $name: { $search: `\'${name}\'` } });

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.addFriend = catchAsync(async (req, res, next) => {
  const friendUsername = req.params.username;

  // TODO : friend !== user

  // TODO : Promisify all
  const user = await User.findById(req.user.id);
  const friend = await User.findOne({ username: friendUsername });

  if (!user) return next(new AppError("Please Log in again!", 401));
  if (!friend)
    return next(new AppError("No User exist for this username!", 400));

  // TODO : CHECK If they are already friend!;

  const uniqueChat = await UniqueChat.create({
    friend: [user._id, friend._id],
  });

  // OPTIMIZE these with $push or similiar query
  user.friends = [
    ...user.friends,
    { friend: friend._id, chatId: uniqueChat._id },
  ];
  friend.friends = [
    ...friend.friends,
    { friend: user._id, chatId: uniqueChat._id },
  ];

  await user.save();
  await friend.save();

  res.status(200).json({
    status: "success",
    friend,
  });
});

exports.removeFriend = catchAsync(async (req, res, next) => {});

exports.getLastSeen = catchAsync(async (req, res, next) => {
  const lastSeen = await LastSeen.findOne({ user: req.params.id });

  res.status(200).json({
    status: "success",
    lastSeen: lastSeen,
  });
});

exports.updateLastSeen = catchAsync(async (req, res, next) => {
  let lastSeen = await LastSeen.findOne({ user: req.user.id });

  // TODO : Update last seen timestamp
  lastSeen.save({ user: req.user.id });

  res.status(200).json({
    status: "success",
    lastSeen: lastSeen.updatedAt,
  });
});
