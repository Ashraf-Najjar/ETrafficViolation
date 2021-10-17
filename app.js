const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const feedRoutes = require('./routes/feed');
const userRoutes = require('./routes/user');
const violationRoutes = require('./routes/violation');
const violationLogRoutes = require('./routes/violationLog');
const vehicleRoutes = require('./routes/vehicle');

const app = express();

var options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    useNewUrlParser: false,
    //useFindAndModify: false,

     // useNewUrlParser: true,
     // useCreateIndex: true,
     // useUnifiedTopology: true
};

//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use('/user', userRoutes);

app.use('/violation', violationRoutes);

app.use('/violationLog', violationLogRoutes);

app.use('/vehicle', vehicleRoutes);

mongoose.connect('mongodb://localhost/andriod-project', options, async(err, res)=> {
    if(err){
        throw err;
    }else{
        console.log('connected')
        app.listen(8080);
    }
});