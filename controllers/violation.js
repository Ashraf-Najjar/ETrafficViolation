const {validationResult} = require('express-validator');
const Violation = require('../models/violation');
//import mongoose from 'mongoose';

exports.getViolations = (req, res, next) => {
    if(req.userData.role != "Admin"){
      return res.status(401).json({
        message: 'You dont hava permission to do this operation',
    });
    }
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    console.log(skip, '  ', limit)
    Violation.find().skip(skip * limit).limit(limit)
    .then(violations => {
        fetchedViolations = violations;
        return Violation.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Violations fetched successfully!",
          violations: fetchedViolations,
          maxViolations: count
        });
      }).catch(err => console.log(err));

}

// exports.getPostById = (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//         console.log("sss")
//         if(post){
//             res.status(200).json(post);
//         } else{
//             res.status(404).json({
//                 message: 'Post not found'
//             });
//         }
//     }).catch(err => console.log(err))
// }

// exports.updatePost = (req, res, next) => {
//     const id = req.params.id;
//     const title = req.body.title;
//     const content = req.body.content;
//     Post.updateOne({ _id: req.params.id, creator: req.userData.userId },{
//         title: title,
//         content: content
//     }).then(result => {
//         console.log(result)
//         if (result.matchedCount > 0) {
//             res.status(200).json({ message: "Update successful!" });
//           } else {
//             res.status(401).json({ message: "Not authorized!" });
//           }
//     }).catch(err => console.log(err))
// }

exports.createViolation = async (req, res, next) => {
    // const errors = validationResult(req);
    // console.log(req)
    // if(!errors.isEmpty()){
    //     return res.status(422).json({message: 'Validation failed', errors: errors.array()})
    // }

    if(req.userData.role != "Admin"){
      return res.status(401).json({
        message: 'You dont hava permission to do this operation',
    });
    }
    const violationType = req.body.violationType;
    const tax = req.body.tax;
    // get max id to auto increment
    const lastViolation = await Violation.find().limit(1).sort({id: -1});
    let id = 1;
    if(lastViolation && lastViolation.length){
      id = +lastViolation[0].id + 1;
    }
    const violation = new Violation({
        violationType: violationType,
        tax: tax,
        id: id
    });
    violation.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Violation created successfully!',
            post: result
        })
    }).catch(err => {console.log(err)});
}