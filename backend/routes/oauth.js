const KakaoStrategy = require("passport-kakao").Strategy;

const kakaoKey = {
    clientID: process.env.KAKAO_KEY,
    clientSecret: "3nEYOBu421uJJzI254LYPfanElv4yAWZFtmWj",
    callbackURL: "http://localhost:3000/api/auth/kakao/callback"
};


passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
    })
);

module.exports = passport;
