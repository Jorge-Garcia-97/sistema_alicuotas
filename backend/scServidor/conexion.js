var mysql = require('mysql');
var pool = mysql.createPool({
    host:'sistema-ali-db2.cy0u5e7biw5u.sa-east-1.rds.amazonaws.com',
    database: 'ali_database',
    user:'admin',
    password:'sistemaali2022' 
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
