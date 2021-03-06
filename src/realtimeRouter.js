const express = require('express');
const bodyParser = require('body-parser');
const realtimeRouter = express.Router();
realtimeRouter.use(bodyParser.json());

const Realtime = require('./models/realTime');
var FieldValue = require("firebase-admin").firestore.FieldValue;
var moment = require('moment');


realtimeRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /realtime');
    })
    .post((req, res, next) => {
        var uid = req.params.uid || false;
        if (uid) {
            var mqtt = require('mqtt');
            var client  = mqtt.connect({
                host:'195.181.246.243',
                port:'1883',
                password:'987654321',
                username:'sammy'
            });
            client.on('connect', function () {
              var nUid = (uid+'/realtime').toString();
              client.subscribe(nUid)
              client.publish(nUid,Buffer.from(JSON.stringify(req.body)));
            })
            Realtime.findOneAndUpdate(
                { "uid": uid },
                {
                    uid: uid,
                    status: req.body,
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                }
            ).then(result => {
                if (result == null) {
                    Realtime.create({
                        uid: uid,
                        status: req.body,
                        startedAt: moment(FieldValue.serverTimestamp()).unix(),
                        updatedAt: moment(FieldValue.serverTimestamp()).unix()
                    }).then(result => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json('Successful');
                    })
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Successful');
                }
            }).catch(function (error) {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'application/json');
                res.json('Error !');
            });
        } else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /realtime');
    })
    .delete((req, res, next) => {
        res.end('DELETE operation not supported on /realtime');
    });


module.exports = realtimeRouter;
