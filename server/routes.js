'use strict';

// var User = require('./api/user/user.model');
// var errors = require('./components/errors');

module.exports = function(app) {
  // app.get('/api/users', function(req, res) {
  //   User.find({}, function(err, users){
  //     if(err) throw err; //todo: handle better
  //     res.send(users);
  //   });
  // res.send('all users');
  // });
  
  // All undefined asset or api routes should return a 404
  // app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  // .get(errors[404]);
  
  app.route('/*', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/../client/' });
    });
};
