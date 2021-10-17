const Vehicle = require('../models/user');

exports.getVehiclesList = (req, res, next) => {
    console.log("here we are")
    if(req.userData.role != "Admin"){
      return res.status(401).json({
        message: 'You dont hava permission to do this operation',
    });
    }
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    console.log(skip, '  ', limit)
    Vehicle.find().skip(skip * limit).limit(limit)
    .then(vehicle => {
        fetchedVehicle = vehicle;
        return Vehicle.count();
      })
      .then(count => {
        res.status(200).json({
          message: "Vehicle fetched successfully!",
          vehicles: fetchedVehicle,
          maxVehicle: count
        });
      }).catch(err => console.log(err));

}