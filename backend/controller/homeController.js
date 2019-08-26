const User = require('../models/user')
const Menu = require('../models/menu')
const jwt = require('jsonwebtoken')

/*

    GET /home
    {

    }

 */
exports.home = (req, res, next) => {
    Menu.find({}, (err,menus) => {
        if(err) {
            return next(err);
        }
        res.status(200).json(menus);
    })
};
