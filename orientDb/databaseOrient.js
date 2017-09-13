const OrientDB = require('orientjs');

const server = OrientDB({
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'white7546'
});

const db = server.use('express')

// let rec = db.record.get('#26:0')
// 	.then(function(rec){
// 		console.log('loaded record: ',rec)
// 	})
var rec = db.record.get('#26:0')
   .then(
      function(record){
         console.log('Loaded Record:', record);
       }
   );