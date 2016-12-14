var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

/*
var sql = require('mssql');
*/

//bookRouter.use(logger());
bookRouter.use(express.static('public'));

var router = function(nav){
    /* Use mongodb
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
    */

    bookRouter.use(function(req, res, next){
        if(!req.user){
            res.redirect('../');
        } 
        next();
    });
    
    bookRouter.route('/')
        .get(function(req, res){
            //MSSQL
            /*
            var request = new sql.Request();
        
            request.query('select * from books', function(err, recordset){
                console.log(recordset);
                if(!err){
                    res.render('bookListView', {
                    title: 'Hello from render', 
                    nav: nav,
                    books: recordset
                    });
                }else{
                    res.status(500);
                }
            });
            */
        var url = 'mongodb://localhost:27017/libraryApp';
            
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            
            collection.find({}).toArray(function(err, results){
                console.log(results);
                res.render('bookListView',{
                                title: 'Books',
                                nav: nav,
                                books: results
                });
            });
        });
    });

    bookRouter.route('/:id')
        .get(function(req, res){
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');

                collection.findOne({_id: id}, function(err, results){
                    console.log(results);
                    res.render('bookView',{
                                    title: 'Books',
                                    nav: nav,
                                    book: results
                    });
                });
            });
        });
    
    return bookRouter;
};

module.exports = router;