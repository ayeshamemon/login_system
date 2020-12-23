//used mongodb native database:

// const client = require("../utilities/db_config");

// class DeleteModels {
//   constructor() {
//     this.database = client.db("login_system");
//     this.collection = this.database.collection("user");
//   }

//   deleteUser = async (email) => {
//     const result = await this.collection.deleteOne({ email: email });
//     client.close();
//     return result;
//   };
// }

// module.exports = DeleteModels;
