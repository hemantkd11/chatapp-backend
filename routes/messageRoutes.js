const {
  addMessage,
  getAllMessage,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getmessage", getAllMessage);
module.exports = router;
