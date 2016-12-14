var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'The Time Machine',
        genre: 'Science Fiction',
        author: 'H.G. Wells',
        read: false
    }
];

var router = function(nav){
    adminRouter.route('/addBooks')
        .get(function(req, res){
            //mongodb code:
            var url = 'mongodb://localhost:27017/libraryApp';
            
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results){
                    console.log(err);
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });
    return adminRouter;
};

module.exports = router;