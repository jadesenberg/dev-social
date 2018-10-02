const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// @route api/posts
// @desc get all post
// @access public
router.get('/', (req, res) => {
    Post.find().sort({
            date: -1
        }).then(post => res.json(post))
        .catch(err => {
            return res.status(404).json({
                nopostsfound: "No posts found"
            });
        });
});

// @route api/posts/:id
// @desc get post by id
// @access public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => {
            return res.status(404).json({
                nopostfound: "No post found"
            });
        });
});

// @route api/posts/
// @desc create post
// @access private
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })

    newPost.save().then(post => res.json(post));
});

// @route api/posts/:id
// @desc delete post
// @access private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
                notauthorized: "User is not authorized"
            });
        }

        post.remove().then(post => res.json({
            success: true
        }));
    }).catch(err => res.status(404).json({
        postnotfound: "Post not found"
    }));
});

// @route api/posts/like/:id
// @desc like a post
// @access private
router.post('/like/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
                alreadyliked: "User already likes this post"
            });
        }

        post.likes.unshift({
            user: req.user.id
        });

        post.save().then(post => res.json(post));
    }).catch(err => res.status(400).json({
        postnotfound: "Post not found"
    }));
});

// @route api/posts/unlike/:id
// @desc unlike a post
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
                notlike: "You have not liked this post"
            });
        }

        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex);

        post.save().then(post => res.json(post)).catch(err => res.json(err));
    }).catch(err => res.status(400).json({
        postnotfound: "Post not found"
    }));
});

// @route api/posts/comment/:id
// @desc comment to a post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const {
        isValid,
        errors
    } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id).then(post => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }

        //add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
    }).catch(err => res.status(404).json({
        postnotfound: "Post not found"
    }));
})

// @route api/posts/comment/:id/:comment_id
// @desc delete a comment
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            //Check comment exist
            if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({
                    commentNotExist: 'Comment not exist'
                })
            }

            //Make sure only the comment owner can delete comment
            if (req.user.id !== post.comments[removeIndex].user.toString()) {
                return res.status(401).json({
                    notauthorized: "User not authorized"
                });
            }

            //Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id)
            //Splice comment out of array
            post.comments.splice(removeIndex, 1)
            //Save comment
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({
            postNotFound: 'No post found'
        }))
})
module.exports = router;