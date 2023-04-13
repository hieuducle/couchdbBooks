const NodeCouchDb = require('node-couchdb');
const dbName = 'book';
const viewUrl = '_design/alll_books/_view/all';
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "1"
    }
  });

class SiteController {
    index(req, res) {
            couch.get(dbName,viewUrl).then(
              function(data, headers, status){
                res.render('index', {
                  book:data.data.rows 
                });
              },  
              function(err) {
                res.send(err);
              }
            );
        // });
    }

    create(req,res) {
      res.render('create');
      }
      
      store(req,res) {
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
      }

      del(req,res) {
          const id = req.params.id;
          const rev = req.body.rev;
        
          couch.del(dbName, id, rev). then(
            function(data,headers,status){
             res.redirect('/');
          }, function(err){
            res.send(err);
          });
        
      }

      edit(req,res) {
        const id = req.params.id;
        // const rev = req.body.rev;
        
        couch.get(dbName, id).then(({data, headers, status}) => {
          console.log(data);
          res.render('edit', {
            book:data
          });
        }, err => {
          console.log(err);
        });
      }

      update(req,res) {
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
            // console.log('thanh cong');
          },
          function(err) {
            res.send(err);
          }
        );
      }
      


}

module.exports = new SiteController;