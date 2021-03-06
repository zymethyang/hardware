require('dotenv').config()
const admin = require('./firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

var config = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: '*'}));

var port = process.env.PORT || 3000;

const router = require('./routes');
const userRouter = require('./userRouter');
const tempRouter = require('./tempRouter');
const humidityRouter = require('./humidityRouter');
const bumpRouter = require('./bumpRouter');
const feedbackRouter = require('./feedbackRouter');
const realtimeRouter = require('./realtimeRouter');
const errorRouter = require('./errorRouter');
//const messagingRouter = require('./messagingRouter');

app.use('/', router);
app.use('/temp',tempRouter);
app.use('/humidity',humidityRouter);
app.use('/user',userRouter);
app.use('/bump',bumpRouter);
app.use('/feedback',feedbackRouter);
app.use('/realtime',realtimeRouter);
app.use('/error',errorRouter);
//app.use('/messaging',messagingRouter);

app.use('/loaderio-e334cd2d1bb0373da03e0ae2a273b107', function(req, res){
  var file = './src/loaderio-e334cd2d1bb0373da03e0ae2a273b107.txt';
  res.download(file); // Set disposition and send it.
});

app.listen(port);


console.log(`Server listening at ${port}`);
