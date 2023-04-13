const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');

const route = require('./routes');


// couch.listDatabases().then(function(dbs) {
//     console.log(dbs);
// });

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


route(app);




app.listen(3000,function() {
  console.log('sever satrted on port 3000');
});

