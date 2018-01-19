const express = require('express');
const bodyParser = require('body-parser');
const bumpRouter = express.Router();
bumpRouter.use(bodyParser.json());

const Bumps = require('./models/bumps');
var FieldValue = require('firebase-admin').firestore.FieldValue;
var moment = require('moment');


bumpRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var uid = req.params.uid || false;
        if (uid) {
            console.log(uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ uid: uid }).sort({ updatedAt: -1 })
                .then(data => {
                    res.json(data.status);
                    res.statusCode = 200;
                })
                .catch(err => {
                    console.log(user.uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 403;
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });


bumpRouter.route('/doingTask/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var uid = req.params.uid || false;
        if (uid) {
            console.log(uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.find({ $and: [{ uid: uid }, { 'status.from': { $lte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.to': { $gte: moment(FieldValue.serverTimestamp()).unix() } }, { 'status.cCalender': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });

bumpRouter.route('/tempTask/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var uid = req.params.uid || false;
        if (uid) {
            console.log(uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ $and: [{ uid: uid }, { 'status.cTemp': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump);
                })
                .catch(err => {
                    console.log(uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });

bumpRouter.route('/humidityTask/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var uid = req.params.uid || false;
        if (uid) {
            console.log(uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ $and: [{ uid: uid }, { 'status.cHumidity': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(bump);
                })
                .catch(err => {
                    console.log(uid || 'None' + ' Fail to GET Bump Status ! ' + err);
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
        } else {
            console.log(' Fail to GET Bump Status !');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 403;
            res.json('Error');
        }
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /bumps');
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /bumps');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /bumps');
    });


module.exports = bumpRouter;
