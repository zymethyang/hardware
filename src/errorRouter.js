const express = require('express');
const bodyParser = require('body-parser');
const errorRouter = express.Router();
errorRouter.use(bodyParser.json());

const Errors = require('./models/error');
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
            Errors.findOneAndUpdate(
                { "uid": uid },
                {
                    uid: uid,
                    status: req.body,
                    startedAt: moment(FieldValue.serverTimestamp()).unix(),
                    updatedAt: moment(FieldValue.serverTimestamp()).unix()
                }
            ).then(result => {
                if (result == null) {
                    Errors.create({
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