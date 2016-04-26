  var Promise = require('bluebird');
  var express = require('express');
  var app = express();
  var mysql = require("mysql");
  var auth = Promise.promisifyAll(require('passport-local-authenticate'));
  var bodyParser = require('body-parser');
  var https = require('https');
  var fs = require('fs');

  var con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "test"
  });

  var port = process.env.PORT || 3000;
  var conAsync = Promise.promisifyAll(con);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var router = express.Router();

  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
  });

  app.use('/api', router);

  app.get('/',function(req, res){
    res.send('yay! Use /api instead.')
  })

  https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
      passphrase: 'goat'
    }, app).listen(port);


  console.log('Magic happens on port ' + port);