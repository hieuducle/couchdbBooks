const NodeCouchDb = require('node-couchdb');
const dbName = 'book';
const viewUrl = '_design/alll_books/_view/all';
const booksRouter = require('./books');
const sitesRouter = require('./site');
const couch = new NodeCouchDb({
    auth: {
        user: "admin",
        pass: "1"
    }
  });
  
  
 
function route(app) {
    app.use('/books', booksRouter);
    app.use('/', sitesRouter);

    
}

module.exports = route;