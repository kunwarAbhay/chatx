const express = require("express");
const authController = require("../controller/authController.js");
const chatController = require("../controller/chatController.js");

const router = express.Router();

router.use(authController.protect);

router.route("/").get(chatController.getAllChats);

router
  .route("/chat/:chatId")
  .get(chatController.getAllMessages)
  .post(chatController.sendMessage);

router.route("/group").post(chatController.createGroup);

router
  .route("/group/token/:groupId")
  .get(chatController.getGroupInviteToken)
  .delete(chatController.resetToken);

router.route("/group/join/:token").post(chatController.joinGroup);

router.route("/message/:id").delete(chatController.deleteMessage);

module.exports = router;
