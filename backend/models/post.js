const mongoose = require('mongoose');

let PostSchema = new mongoose.Schema({
    //To-do title
    num: {
      type: Number,
    },
    title: {
        type: String,
        required: true
    },
    writer: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    // To-do create date
    createAt: {
        type: Date,
        default: Date.now()
    },
    cknum: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('posts', PostSchema);
