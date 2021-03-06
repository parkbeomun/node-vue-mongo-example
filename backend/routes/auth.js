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

// naver
router.get('/naver', authController.naver)
router.get('/naver/callback', authController.naver_callback)
router.post('/naver/me', authController.naver_me)

router.post('/naver/register', authController.naver_register)
router.post('/kakao/register', authController.kakao_register)





module.exports = router;



