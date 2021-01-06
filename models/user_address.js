const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  firstLine: { type: String },
  lastLine: { type: String },
  pincode: { type: Number },
});

const AddressModel = mongoose.model("addressdetails", AddressSchema);
module.exports = AddressModel;
