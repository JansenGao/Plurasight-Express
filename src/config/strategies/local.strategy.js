var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function(){
  passport.use(new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'password'
  },
    function(username, password, done){
        var url = 'mongodb://localhost:27017/libraryApp';
      
        mongodb.connect(url, function(err, db){
            if(err){
                console.log(err);
                return;
            }
            var collection = db.collection('users');
            collection.findOne({
                            username: username,
                            password: password
                        },
                        function(err, results){
                            if(results != null){
                                //console.log(results);
                                //console.log(password);
                                if(results.password === password){
                                    var user = results;
                                    //console.log(results);
                                    done(null, user);
                                }else{
                                    done(null, false, {message: 'Bad password'});
                                }
                            }else{
                                done(null, false, {message: 'Bad password'});
                            }
                        }
            );
        });
      
        var user = {
            username: username,
            password: password
        };
        //done(null, user);
    }));  
};