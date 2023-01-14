const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError.js");
const User = require("../modal/userModal.js");
const LastSeen = require("../modal/lastSeenModal");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createToken = (id) => {
  const token = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: "2d" });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  const { username, name, email, password } = req.body;

  // TODO : User Already Exist

  const user = await User.create({ username, name, email, password });
  const lastSeen = await LastSeen.create({ user: user._id });

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.checkPassword(password))) {
    return next(new AppError("Invalid username or password", 400));
  }

  const token = createToken(user._id);

  res.status(200).json({
    status: "success",
    user,
    token,
  });
});

exports.logout = catchAsync(async (req, res, next) => {});

exports.forgotPassword = catchAsync(async (req, res, next) => {});

exports.resetPassword = catchAsync(async (req, res, next) => {});

exports.protect = catchAsync(async (req, res, next) => {
  const authorization = req.headers.authorization;

  let token;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new AppError("Invalid Token.Log in Again!", 401));
  }

  req.user = { id: decoded.id };

  next();
});
