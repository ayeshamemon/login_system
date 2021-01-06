// const client = require("../utilities/db_config");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: {
      type: String,
    },
    address: [
      {
        type: Schema.Types.ObjectId,
        ref: "addressdetails",
      },
    ],

    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Female",
      required: true,
      validate: {
        validator: (v) => ["Male", "Female"].includes(v),

        message: (value) => console.log(value, "is not valid"),
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema); //collection_name , schema_name

module.exports = UserModel;

//used mongodb native database:

// class UserModel {
//   constructor() {
//     this.database = client.db("login_system");
//     this.collection = this.database.collection("user");
//   }

//   createUser = async (email, password) => {
//     const result = await this.collection.insertOne({ email, password });
//     await client.close();
//     return result;
//   };

//   getPasswordFromEmail = async (email) => {
//     return await this.collection.findOne({ email });
//   };
// }
