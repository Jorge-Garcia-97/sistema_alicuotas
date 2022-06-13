var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    database: 'bdCobranza',
    user:'root',
    password:'' 
});

var getConnection = function (cb) {
  pool.getConnection(function (err, connection) {
    if (err) {
      return cb(err);
    }
    cb(null, connection);
  });
};

module.exports = getConnection;
