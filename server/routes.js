'use strict';

// var User = require('./api/user/user.model');

module.exports = function(app) {
  app.get('/api/users', function(req, res) {
  //   User.find({}, function(err, users){
  //     if(err) throw err; //todo: handle better
  //     res.send(users);
  //   });
  res.send('all users');
  });
  
  app.all('*', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/../client/' });
    });
};
