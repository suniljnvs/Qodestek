const express = require('express');

const router = express.Router();


const { signup_User } = require('../controllers/controller');



router.post("/signup", signup_User)
// router.post("/login", login);





module.exports = router;