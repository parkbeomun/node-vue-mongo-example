const mongoose = require('mongoose');

let MenuSchema = new mongoose.Schema({
    //To-do title
    name: {
        type: String,
        required: true
    },
    depth: {
        type: Number,
        required: true,
        default: 0
    },
    useYn: {
        type: String,
        required: true,
        default: 'N'
    },
    sort: {
        type: Number,
        required: true,
        default: 0
    },
    grant: { /* 1 : 관리자 , 2: 사용자 */
        type: Number,
        required: true,
        default: 2
    },
    // To-do create date
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('menus', MenuSchema);
