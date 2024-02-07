var JDBC = require('jdbc');

var jinst = require('jdbc/lib/jinst');
//var asyncjs = require('async');
if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['./drivers/mysql-connector-j-8.2.0']);
  }
  var config = {
    // SparkSQL configuration to your server
    //url: 'jdbc:datadirect:sforce://login.salesforce.com;DatabaseName=default;SecurityToken=stoken',
    //drivername: 'com.ddtek.jdbc.sforce.SForceDriver',
    url: 'jdbc:mysql://se-library-mysql.c4ttnsr9vh61.eu-west-1.rds.amazonaws.com/store',
    minpoolsize: 1,
    maxpoolsize: 100,
    user: 'matillion',
    password: 'password',
    properties: {}
  };
  var sforcesqldb = new JDBC(config);
//initialize
sforcesqldb.initialize(function(err) {
    if (err) {
      console.log(err);
    }
  });
   
  sforcesqldb.reserve(function(err, connObj) {
    if (connObj) {
      console.log("Using connection: " + connObj.uuid);
      var conn = connObj.conn;
       
      // // Query the database.
      // asyncjs.series([
      //   function(callback) {
      //     // Select statement example.
      //     conn.createStatement(function(err, statement) {
      //       if (err) {
      //         callback(err);
      //       } else {
      //         statement.setFetchSize(100, function(err) {
      //           if (err) {
      //             callback(err);
      //           } else {
      //       //Execute a query
      //             statement.executeQuery("SELECT * FROM SFORCE.Account;",
      //                 function(err, resultset) {
      //                   if (err) {
      //                     callback(err)
      //                   } else {
      //                     resultset.toObjArray(function(err, results) {
      //                       //Printing number of records
      //                       if (results.length > 0) {
      //                         console.log("Record count: " + results.length);
      //                         console.log(results);
      //                       }
      //                       callback(null, resultset);
      //                     });
      //                   }
      //                 });
      //           }
      //         });
      //       }
      //     });
      //   },
      // ], function(err, results) {
      //   // Results can also be processed here.
      //   // Release the connection back to the pool.
      //   sforcesqldb.release(connObj, function(err) {
      //     if (err) {
      //       console.log(err.message);
      //     }
      //   });
      // });
    }
  });