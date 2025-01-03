const {
  register,
  loginUser,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/setavatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);
module.exports = router;
