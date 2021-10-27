const {validationResult} = require('express-validator');
const Post = require('../models/post');
//import mongoose from 'mongoose';

exports.getPosts = (req, res, next) => {
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    Post.find().skip(skip * limit).limit(limit)
    .then(documents => {
        fetchedPosts = documents;
        return Post.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: fetchedPosts,
          maxPosts: count
        });
      }).catch(err => console.log(err));

}

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        } else{
            res.status(404).json({
                message: 'Post not found'
            });
        }
    }).catch(err => console.log(err))
}

exports.updatePost = (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId },{
        title: title,
        content: content
    }).then(result => {
        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Update successful!" });
          } else {
            res.status(401).json({ message: "Not authorized!" });
          }
    }).catch(err => console.log(err))
}

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'Validation failed', errors: errors.array()})
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        creator: req.userData.userId,
        imageUrl: 'images/test.jpg'
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        })
    }).catch(err => {console.log(err)});
}