const express = require('express');
const router = express.Router();

const booksController = require ('../controllers/BookController');

router.get('/details/:id', booksController.details);

module.exports = router;