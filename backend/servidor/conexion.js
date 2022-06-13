var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'sag-database.czblaypg2cqn.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'ECTHcASbdw7Lqb1FyFaV',
  database: 'sagdb2',
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