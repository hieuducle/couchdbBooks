const NodeCouchDb = require('node-couchdb');
const dbName = 'book';
const viewUrl = '_design/alll_books/_view/all';
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "1"
    }
  });

class BookController {
    index(req, res) {
        res.send('book');
    }

    details(req,res) {
        const id = req.params.id;
        // const rev = req.body.rev;
        
        couch.get(dbName, id).then(({data, headers, status}) => {
          console.log(data);
          res.render('bookDetails', {
            book:data
          });
        }, err => {
          console.log(err);
        });
    }
}

module.exports = new BookController;