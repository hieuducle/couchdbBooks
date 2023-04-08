const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');


const nano = require('nano')('http://admin:1@localhost:5984');



const couch = new NodeCouchDb({
  auth: {
      user: "admin",
      pass: "1"
  }
});


const dbName = 'book';
const viewUrl = '_design/alll_books/_view/all';

couch.listDatabases().then(function(dbs) {
    console.log(dbs);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
    couch.get(dbName,viewUrl).then(
      function(data, headers, status){
        console.log(data.data.rows);
        res.render('index', {
          book:data.data.rows 
        });
      },
      function(err) {
        res.send(err);
      }
    );
});

app.post('/book/add', function(req,res) {
  const name = req.body.name;
  const author = req.body.author;
  const price = req.body.price;
  const genre = req.body.genre;
    // res.send(name);
    couch.uniqid().then(function(ids){
      const id = ids[0];
      couch.insert('book', {
        _id: id,
        name: name,
        author: author,
        price: price,
        genre: genre
      }).then(
        function(data,headers, status) {
            res.redirect('/');
        },
        function(err) {
          res.send(err);
        }
      );
    });
});

app.post('/book/delete/:id', function(req,res) {
  const id = req.params.id;
  const rev = req.body.rev;

  couch.del(dbName, id, rev). then(
    function(data,headers,status){
     res.redirect('/');
  }, function(err){
    res.send(err);
  });
});
app.listen(3000,function() {
    console.log('sever satrted on port 3000');
});

app.post('/book/update/:id', function(req, res) {
  const id = req.params.id;
  const rev = req.body.rev;
  const name = req.body.name;
  const author = req.body.author;
  const price = req.body.price;
  const genre = req.body.genre;

  couch.update(dbName, {
    _id: id,
    _rev: rev,
    name: name,
    author: author,
    price: price,
    genre: genre
  }).then(
    function(data, headers, status) {
      res.redirect('/');
    },
    function(err) {
      res.send(err);
    }
  );
});