const cors = require('cors');
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
port = process.env.PORT || 8080;

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testExpress',
});

// connect to database
mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route
