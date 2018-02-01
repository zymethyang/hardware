const express = require('express');
const bodyParser = require('body-parser');
const tempRouter = express.Router();
tempRouter.use(bodyParser.json());

const Humiditys = require('./models/humiditys');
const Temps = require('./models/temps');
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');


tempRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(1);
    })
    .post((req, res, next) => {
        var uid = req.params.uid || false;
        if (uid) {

            var keyList = Object.keys(req.body);
            var newData = new Array(0);
            var newTemp = new Object;
            var newHumidity = new Object;

            for (var i = 0; i < keyList.length; i++) {
                newData.push(req.body[keyList[i]]);
            }
            for (var i = 0; i < keyList.length; i++) {
                if(newData[i][0]!==0){
                    newTemp[keyList[i]] = newData[i][0];
                }
            }
            for (var i = 0; i < keyList.length; i++) {
                if(newData[i][1]!==0){
                    newHumidity[keyList[i]] = newData[i][1];
                }
            }

            console.log(uid + ' POST Temperature at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            var mean = Math.round(Object.values(newTemp).reduce(reducer) / (Object.values(newTemp).length));
            Temps.create({
                uid: uid,
                temp: newTemp,
                mean: mean,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            })

            console.log(uid + ' POST Humidity at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            var mean =  Math.round(Object.values(newHumidity).reduce(reducer) / (Object.values(newHumidity).length));
            Humiditys.create({
                uid: uid,
                humidity: newHumidity,
                mean: mean,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(function (docRef) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Successful');
            }).catch(function (error) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Error');
                console.error(user.uid + ' POST error at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"), error);
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
        res.end('PUT operation not supported on /temp');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /temp');
    });


module.exports = tempRouter;
