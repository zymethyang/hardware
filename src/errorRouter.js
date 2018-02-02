const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');
const errorRouter = express.Router();
errorRouter.use(bodyParser.json());

const Errors = require('./models/error');
const Messagings = require('./models/messagings');
var FieldValue = require('firebase-admin').firestore.FieldValue;
var moment = require('moment');


errorRouter.route('/:uid')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /errors');
    })
    .post((req, res, next) => {
        var uid = req.params.uid || false;
        if (uid) {

            var mqtt = require('mqtt');
            var client = mqtt.connect({
                host: '195.181.246.243',
                port: '1883',
                password: '987654321',
                username: 'sammy'
            });

            client.on('connect', function () {
                var nUid = (uid + '/error').toString();
                client.subscribe(nUid)
                client.publish(nUid, Buffer.from(JSON.stringify(req.body)));
            })

            Messagings.find({ uid: uid })
                .then(result => {
                    result.forEach(data => {
                        request({
                            url: "https://fcm.googleapis.com/fcm/send",
                            method: "POST",
                            headers: {
                                "Authorization": "key=AAAA3awCskk:APA91bGqp9AQBv8lpzPWptO65D7ZvHnzfp9pKi6zBp_0TfZ8DYH6WZKjIs-902LS0p3zCoqxFWFYPj_n90id3NezFLOVPvdva22TV3RRjm1b2f0E-KqyAIKPgwAoOxYYOBrm0q00Co0H"
                            },
                            json: {
                                "notification": {
                                    "title": "Cảnh báo",
                                    "body": "Máy bơm gặp vấn đề",
                                    "icon": "https://firebasestorage.googleapis.com/v0/b/admin-e8a7b.appspot.com/o/images%2Fcaution.png?alt=media&token=e11142dd-0e77-4dcd-8d96-d2d39faac098",
                                    "click_action": "https://solavo.net/#/home"
                                },
                                "to": data.token
                            }
                        });
                    })
                })


            Errors.create({
                uid: uid,
                status: req.body,
                startedAt: moment(FieldValue.serverTimestamp()).unix(),
                updatedAt: moment(FieldValue.serverTimestamp()).unix()
            }).then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Successful');
            }).catch((err) => {
                console.log(err);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json('Error');
            });

        } else {
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json('Error');
        }
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /feedback');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /feedback');
    });

module.exports = errorRouter;