//used mongodb native database:

// const client = require("../utilities/db_config");
// class UpdateModels {
//   constructor() {
//     this.database = client.db("login_system");
//     this.collection = this.database.collection("user");
//   }
//   updateUser = async ({ email, password }) => {
//     const result = await this.collection.updateOne(
//       { email: email },
//       { $set: { password: password } }
//     );

//     client.close();
//     return result;
//   };
// }

// module.exports = UpdateModels;
