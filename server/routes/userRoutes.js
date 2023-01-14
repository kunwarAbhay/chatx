const express = require("express");
const authController = require("../controller/authController.js");
const userController = require("../controller/userController.js");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("forgot-password").post(authController.forgotPassword);
router.route("forgot-password/:token").post(authController.resetPassword);

// SEARCH USERS
router.route("/username/:username").get(userController.getUserByUsername);
router.route("/search-username/:username").get(userController.searchUsername);
router.route("/search-name/:name").get(userController.searchName);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

router
  .route("/add-friend/:username")
  .get(authController.protect, userController.addFriend)
  .delete(authController.protect, userController.removeFriend);

router.route("/last-seen/:id").get(userController.getLastSeen);

router
  .route("/last-seen")
  .post(authController.protect, userController.updateLastSeen);

// RESTRICT TO ADMIN ONLY
router.route("/").get(userController.getAllUsers);

module.exports = router;
