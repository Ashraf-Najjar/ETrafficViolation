const {validationResult} = require('express-validator');
const ViolationLog = require('../models/violationLog');
//import mongoose from 'mongoose';

exports.getViolationsLog = (req, res, next) => {
    console.log("here we are")
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    const searchKey = req.query.searchKey ? req.query.searchKey : null;
    const searchValue = req.query.searchValue ? req.query.searchValue : null;
    console.log(skip, '  ', limit)
    let query = {};
    // case not admin -> return his own not aid violatians log
    if(req.userData.role != "Admin"){
      console.log(req.userData)
      query['plugedNumber'] = req.userData.plugedNumber;
      query['isPaid'] = false;
    }

    if(searchKey && searchValue){
      if(searchKey == 'plugedNumber'){
        query[searchKey] = searchValue;
      }
      else if(searchKey == 'date'){
        query[searchKey] = {$gt: new Date(new Date(searchValue).toISOString())};
      }else{
        query[searchKey] = new RegExp(searchValue, "i");
      }

    }
    console.log(query)
    ViolationLog.find(query).populate("violation_id").skip(0).limit(100)
    .then(violationLog => {
        fetchedViolationLog = violationLog;
        return ViolationLog.count(query);
      })
      .then(count => {
        res.status(200).json({
          message: "Violation Log fetched successfully!",
          violationsLog: fetchedViolationLog,
          maxViolationsLog: count
        });
      }).catch(err => console.log(err));

}

exports.getViolationLogById = (req, res, next) => {
  if(req.userData.role != "Admin"){
    return res.status(401).json({
      message: 'You dont hava permission to do this operation',
  });
  }
  ViolationLog.findById(req.params.id).then(violationLog => {
        if(violationLog){
            res.status(200).json(violationLog);
        } else{
            res.status(404).json({
                message: 'violation log not found'
            });
        }
    }).catch(err => console.log(err))
}

exports.updateViolationLog = (req, res, next) => {
  if(req.userData.role != "Admin"){
    return res.status(401).json({
      message: 'You dont hava permission to do this operation',
  });
  }
    const id = req.params.id;
    const plugedNumber = req.body.plugedNumber;
    const violation_id = req.body.violation_id;
    const date = req.body.date;
    const location = req.body.location;
    const isPaid = req.body.isPaid;
    ViolationLog.updateOne({ _id: req.params.id, creator: req.userData.userId },{
        plugedNumber: plugedNumber,
        violation_id: violation_id,
        date: date,
        location: location,
        isPaid: isPaid
    }).then(result => {
        console.log(result)
        if (result.matchedCount > 0) {
            res.status(200).json({ message: "Update successful!" });
          } else {
            res.status(401).json({ message: "Not authorized!" });
          }
    }).catch(err => console.log(err))
}

exports.createViolationLog = (req, res, next) => {
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
    const plugedNumber = req.body.plugedNumber;
    const violation_id = req.body.violation_id;
    const date = req.body.date;
    const location = req.body.location;
    const isPaid = req.body.isPaid;
    const violationLog = new ViolationLog({
        plugedNumber: plugedNumber,
        violation_id: violation_id,
        date: date,
        location: location,
        isPaid: isPaid
    });
    violationLog.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Violation created successfully!',
            violationLog: result
        })
    }).catch(err => {console.log(err)});
}

exports.payViolation = (req, res, next) => {
  const id = req.body._id;
  ViolationLog.updateOne({_id: id},{isPaid:true}).then(result => {
    res.status(201).json({
      message: 'Violation Payed successfully!',
      violationLog: result
    })
  }).catch(err => {console.log(err)});
}