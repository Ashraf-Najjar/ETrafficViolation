const VehiclesLog = require('../models/vehiclesLog');
const mongoose = require('mongoose');

exports.getVehiclesLog = (req, res, next) => {
  console.log("here we are")
  console.log(req.userData)
    if(req.userData.role != "Admin"){
      return res.status(401).json({
        message: 'You dont hava permission to do this operation',
    });
    }
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    VehiclesLog.find().skip(skip * limit).limit(limit)
    .then(vehiclesLog => {
        fetchedVehiclesLog = vehiclesLog;
        return VehiclesLog.count();
      })
      .then(count => {
        console.log(fetchedVehiclesLog)
        res.status(200).json({
          message: "Vehicles log fetched successfully!",
          vehiclesLog: fetchedVehiclesLog,
          maxVehiclesLog: count
        });
      }).catch(err => console.log(err));

}

exports.vehicleCrossOut = (req, res) =>{
  const id = req.query._id;
  VehiclesLog.updateOne({_id: mongoose.Types.ObjectId(id)}, {isCrossOut: true}).then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Vehicle crossed out successfully!',
      vehicleLog: result
    })
  }).catch(err => {console.log(err)});
}