const express = require('express');
const bodyParser = require('body-parser');
const humidityRouter = express.Router();
humidityRouter.use(bodyParser.json());

const Humiditys = require('./models/humiditys');
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');

humidityRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /humidity');
    })
    .post((req, res, next) => {
        var uid = req.params.uid || false;
        if (uid) {
            console.log(uid + ' POST Humidity at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            var mean =  Math.round(Object.values(req.body).reduce(reducer) / (Object.values(req.body).length));
            Humiditys.create({
                uid: uid,
                humidity: req.body,
                mean: mean,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(function (docRef) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Successful');
            })
                .catch(function (error) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                    console.error(user.uid + ' POST Humidity error at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"), error);
                });
        } else {
            console.log('Fail to POST TEMPORATURE AT ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /humidity');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not support on /humidity');
    });


module.exports = humidityRouter;
