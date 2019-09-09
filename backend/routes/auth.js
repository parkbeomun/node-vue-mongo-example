const express = require('express');
const passport = require('passport')
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const authController = require('../controller/authController');

router.post('/login',authController.login)
router.post('/register',authController.register)


router.use('/check', authMiddleware)
router.get('/check', authController.check)
router.use('/me', authMiddleware)
router.get('/me',authController.me)



/* social login */

// api/auth/naver
router.get('/naver', authController.naver)


module.exports = router;



