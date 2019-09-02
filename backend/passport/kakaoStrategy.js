const KakaoStrategy = require('passport-kakao').Strategy

const User = require('../models/user')

module.exports = (passport) => {

    passport.use('kakao',new KakaoStrategy({
        clientID: process.env.KAKAO_KEY,
        callbackURL: 'http://localhost:3000/api/auth/kakao/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.find({where: {snsId: profile.id, provider: 'kakao'}})

            if (exUser) {
               done(null,exUser)
            }else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao'
                })
                done(null, newUser)
            }
        } catch(error) {
            console.error(error)
            done(error)
        }

    }))
}