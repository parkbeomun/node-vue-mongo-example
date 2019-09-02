const mongoose = require('mongoose');
const Schema = mongoose.Schema

const User = new Schema({
    //To-do title
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

module.exports = mongoose.model('users', User);