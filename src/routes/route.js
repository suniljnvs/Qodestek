const express = require('express');

const router = express.Router();


const { signup_User, login_User,create_Product } = require('../controllers/controller');



router.post("/signup-user", signup_User)
router.post("/login-user", login_User)
router.post("/create-product", create_Product)





module.exports = router;