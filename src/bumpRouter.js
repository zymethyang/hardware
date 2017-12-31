const express = require('express');
const bodyParser = require('body-parser');
const bumpRouter = express.Router();
bumpRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Bumps = require('./models/bumps');
const firebase = require('firebase');
var FieldValue = require('firebase-admin').firestore.FieldValue;
var moment = require('moment');


bumpRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .get((req, res) => {
        var user = firebase.auth().currentUser || false;
        if (user) {
            console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
            Bumps.findOne({ uid: user.uid }).sort({ updatedAt: -1 })
            .then(data =>{ 
                res.json(data.status);
                res.statusCode = 200;
            })
            .catch(err =>{
                console.log(user.uid + ' Fail to GET Bump Status !' + err);
                res.statusCode = 403;
                res.json('Error');
            });
        } else {
            console.log(user.uid + ' Fail to GET Bump Status !');
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


    bumpRouter.route('/doingTask')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res) => {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
                Bumps.find({ $and: [{ uid: user.uid }, { 'status.from': { $lte: moment(FieldValue.serverTimestamp()).unix() } } , { 'status.to': { $gte: moment(FieldValue.serverTimestamp()).unix() } } , { 'status.cCalender': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump =>{
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid + ' Fail to GET Bump Status !');
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
            } else {
                console.log(user.uid + ' Fail to GET Bump Status !');
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

        bumpRouter.route('/tempTask')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res) => {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
                Bumps.findOne({ $and: [{ uid: user.uid },{ 'status.cTemp': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump =>{
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid + ' Fail to GET Bump Status !');
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
            } else {
                console.log(user.uid + ' Fail to GET Bump Status !');
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

        bumpRouter.route('/humidityTask')
        .all((req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.header('Access-Control-Allow-Origin', '*');
            next();
        })
        .get((req, res) => {
            var user = firebase.auth().currentUser;
            if (user) {
                console.log(user.uid + ' GET Bump Status ! at ' + moment(FieldValue.serverTimestamp()).format("YYYY-MM-DD hh:mm a"));
                Bumps.findOne({ $and: [{ uid: user.uid },{ 'status.cHumidity': { $eq: true } }] }).sort({ updatedAt: -1 })
                .then(bump =>{
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.json(bump.reverse());
                })
                .catch(err => {
                    console.log(user.uid + ' Fail to GET Bump Status !');
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.json('Error');
                });
            } else {
                console.log(user.uid + ' Fail to GET Bump Status !');
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
