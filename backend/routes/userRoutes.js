const express=require('express');
const router = express.Router();
const {registerUser,authUser, allUsers}=require("../controller/userController");
const { protect } = require('../middleware/authMiddleware');


router.route('/').post(registerUser).get(allUsers,protect);
router.route('/login').post(authUser);

module.exports=router;