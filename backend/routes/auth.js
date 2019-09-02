const express = require('express');
const passport = require('passport')
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const authController = require('../controller/authController');

console.log('auth route')

router.post('/login',authController.login)
router.post('/register',authController.register)


router.use('/check', authMiddleware)
router.get('/check', authController.check)
router.use('/me', authMiddleware)
router.get('/me',authController.me)



/* social login */
//console.log('get kakao')
router.get('/kakao', passport.authenticate('kakao'))
//console.log('callback kakao')
router.get('/kakao/callback',passport.authenticate('kakao',{
    filureRedirect:'/',
}), (req,res) => {
    res.redirect('/')
})

module.exports = router;



