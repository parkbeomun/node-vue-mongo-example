const express = require('express');
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
const KakaoStrategy = require("passport-kakao").Strategy;


const kakaoKey = {
    clientID: process.env.KAKAO_KEY,
    clientSecret: "",
    callbackURL: "http://localhost:3000/api/auth/kakao/callback"
};


passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    })
);

router.get('/kakao', passport.authenticate('kakao-login'))
router.get('/kakao/callback', {
    successRedirect: "/",
    failureRedirect: "/api/auth/fail"
})

module.exports = router;



