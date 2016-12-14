var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
// MSSQL configs:
/*
var sql = require('mssql');
var config = {
    user: 'books',
    password: 'pluralsight1@',
    server: 'gpnju6fwr2.database.windows.net',
    database: 'Books',
    options: {
        encrypt: true
    }
};

sql.connect(config, function(err){
    console.log(err);
});
*/

var app = express();

var port = process.env.PORT || 5000;

var nav = [{
            Link: '/Books',
            Text: 'Book'
        }, {
            Link: '/Authors',
            Text: 'Author'
        }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app);

//app.use(express.static('src/views'));

app.set('views', './src/views');

//var handlebars = require('express-handlebars');

//app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', 'ejs');

app.use('/books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
            title: 'Hello from render', 
            nav: [{
                    Link: '/Books',
                    Text: 'Books'
                }, {
                    Link: '/Authors',
                    Text: 'Authors'
                }]
    });
});

app.get('/books', function (req, res) {
    res.send('');
});
app.listen(port, function (err) {
    console.log('running server on port: ' + port);
});