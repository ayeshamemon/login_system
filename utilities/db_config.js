const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://localhost/login_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
module.exports = connection;

//singletomn class
// class DBConnection {
//   static connection = null;
//   constructor() {}
//   getInstance() {
//     if (!connection) {
//       return connection;
//     }
//     return mongoose.connect("mongodb://localhost/login_system", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     });
//   }
// }
//export the class
//used mongodb native database:

// const { MongoClient } = require("mongodb");

// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });
// async function run() {
//   try {
//     await client.connect();
//   } catch (err) {
//     console.error(err);
//   }
// }
// run().catch(console.dir);
// module.exports = client;
