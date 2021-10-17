const VehiclesLog = require('../models/vehiclesLog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  const driver = req.body.driver;
  const plugedNumber = req.body.plugedNumber;
  const type = req.body.type;
  const category = req.body.category;
  const productionDate = req.body.productionDate;
  const registrationDate = req.body.registrationDate;
  //const hash = await bcrypt.hash(plugedNumber.toString(), 10);
  // if(hash){
      const vehiclesLog = new VehiclesLog({
          driver: driver,
          plugedNumber: plugedNumber,
          type: type,
          category: category,
          productionDate: productionDate,
          registrationDate: registrationDate,
          IsCrossOut: false
      });
      vehiclesLog.save().then(result => {
          res.status(201).json({
              message: 'Vehicles Log created successfully',
              result: result
          })
      }).catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  // }
}
// Ashraf Najjar 10003
// Super Admin 60001
exports.login = (req, res, next) => {
  let plugedNumber = req.body.plugedNumber;
  console.log("request send")
  console.log(req.body)
  if(typeof(plugedNumber)== "string"){
    console.log("here we are , we should transfer it");
    plugedNumber = parseInt(plugedNumber);
  }
  VehiclesLog.findOne({ driver: new RegExp(req.body.driver, 'i'), plugedNumber: plugedNumber })
    .then(vehicle => {
      if (!vehicle) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      console.log(vehicle)
      const token = jwt.sign(
        { plugedNumber: vehicle.plugedNumber, vehicleId: vehicle._id, role: vehicle.role ? vehicle.role : 'user' },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: vehicle._id,
        role: vehicle.role,
        plugedNumber: vehicle.plugedNumber.toString(),
        userData:{
          token: token,
          expiresIn: 3600,
          userId: vehicle._id,
          role: vehicle.role,
          plugedNumber: vehicle.plugedNumber.toString(),
        }
      });
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}
// Log in with encrypt check
// exports.login = (req, res, next) => {
//   let fetchedVehicle;
//   VehiclesLog.findOne({ driver: new RegExp(req.body.driver, 'i') })
//     .then(vehicle => {
//       if (!vehicle) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       console.log(vehicle)
//       fetchedVehicle = vehicle;
//       return bcrypt.compare(req.body.plugedNumber.toString(), vehicle.plugedNumber);
//     })
//     .then(result => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       const token = jwt.sign(
//         { plugedNumber: fetchedVehicle.plugedNumber, vehicleId: fetchedVehicle._id, role: fetchedVehicle.role ? fetchedVehicle.role : 'user' },
//         "secret_this_should_be_longer",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600,
//         userId: fetchedVehicle._id,
//         role: fetchedVehicle.role
//       });
//     })
//     .catch(err => {
//       console.log(err)
//       return res.status(401).json({
//         message: "Invalid authentication credentials!"
//       });
//     });
// }

// exports.signup = async (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const hash = await bcrypt.hash(password, 10);
//     if(hash){
//         const user = new User({
//             email: email,
//             password: hash,
//         });
//         user.save().then(result => {
//             res.status(201).json({
//                 message: 'user created successfully',
//                 result: result
//             })
//         }).catch(err => {
//           res.status(500).json({
//             message: "Invalid authentication credentials!"
//           });
//         });
//     }
// }

// exports.login = (req, res, next) => {
//     let fetchedUser;
//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({
//             message: "Auth failed"
//           });
//         }
//         fetchedUser = user;
//         return bcrypt.compare(req.body.password, user.password);
//       })
//       .then(result => {
//         if (!result) {
//           return res.status(401).json({
//             message: "Auth failed"
//           });
//         }
//         const token = jwt.sign(
//           { email: fetchedUser.email, userId: fetchedUser._id },
//           "secret_this_should_be_longer",
//           { expiresIn: "1h" }
//         );
//         res.status(200).json({
//           token: token,
//           expiresIn: 3600,
//           userId: fetchedUser._id
//         });
//       })
//       .catch(err => {
//         return res.status(401).json({
//           message: "Invalid authentication credentials!"
//         });
//       });
//   }