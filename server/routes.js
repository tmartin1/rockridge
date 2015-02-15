'use strict';

// var User = require('./api/user/user.model');

module.exports = function(app) {
  
  app.use('/api/user', require('./api/user/'));
  
  app.route('/*', function (req, res) {
      res.sendFile('index.html', { root: __dirname + '/../client/' });
    });
};
