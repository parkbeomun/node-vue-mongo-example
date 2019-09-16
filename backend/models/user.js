const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    nick: {
        type: String,
        require: true
    },
    snsId: {
        type: String,
        require: true
    },
    provider: {
        type: String,
        require: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    access_token: {
        type: String,
        require: true
    }

});

//create new User document
User.statics.create = function(email, password, name) {
    const user = new this({
        email,
        password,
        name,
    })

    //return the Promise
    return user.save()
}

//find one user by using username
User.statics.findOneByEmail = function(email) {
    return this.findOne({
        email
    }).exec()
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save();
}

//vertify the password of the User document
User.methods.verify = function(password) {
    return this.password === password
}


/* ******************************************************************
** 소셜 로그인 관련
 * ******************************************************************/

//find one user by using username
User.statics.findOneByEmailAndProvider = function(email, provider) {
    return this.findOne({
        email,
        provider
    }).exec()
}

//create new User document
User.statics.social_create = function(email, password, name, nick, snsId, provider, access_token ) {
    const user = new this({
        email,
        password,
        name,
        nick,
        snsId,
        provider,
        access_token
    })

    //return the Promise
    return user.save()
}

module.exports = mongoose.model('users', User);