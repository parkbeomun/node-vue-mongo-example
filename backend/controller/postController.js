const Posts = require('../models/post');

exports.index = (req, res, next) => {
    Posts.find({}, (err, posts) => {
        if(err) {
            return next(err);
        }
        res.status(200).json(posts);
    });
};

exports.create = (req, res, next) => {
    let posts = new Posts({
        title: req.body.title,
        content: req.body.content,
    });

    posts.save((err) => {
        if(err) {
            return next(err);
        }
        res.status(200).json({"msg":"succes"})
    })
}
exports.edit = (req, res, next) => {
    Posts.findById(req,params.id, (err, post) => {
        if(err) {
            return next(err);
        }
        res.status(200).json(post);
    });
};
exports.update = (req, res, next) => {
    Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, post) => {
        if(err) {
            return next(err);
        }
        res.status(200).json(post);
    })
}
exports.delete = (req, res, next) => {
    Posts.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            return next(err);
        }
        Posts.find({}, (err, posts) => {
            if(err) {
                return next(err);
            }
            res.status(200).json(posts);
        });
    })
}