var config = require('../../config/config')
var nexmo = require('easynexmo');
// https://github.com/pvela/nexmo
nexmo.initialize(config.nexmo.id, config.nexmo.secret,'http', false);

var Nexmo = function() {};

Nexmo.prototype.sendText = function(from, to, text, cb) {
  nexmo.sendTextMessage(from, to, text, {}, function(err, res){
    if(err) throw err;
    cb(res);
  });
};

//TODO: ask someone why this won't work
// var test = new Nexmo();
// test.sendText('test', function(res){
//   console.log('res', res);
// });


module.exports = Nexmo;
