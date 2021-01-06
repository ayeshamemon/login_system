const connection = require("../utilities/db_config");
const UserModel = require("../models/user_models");
const AddressModel = require("../models/user_address");
class AuthService {
  registerUserService = async (email, hashedPassword, gender, address) => {
    await connection;
    const addressModel = new AddressModel(address);
    const savedAddress = await addressModel.save();
    console.log({ savedAddress });
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      gender,
      address: [savedAddress._id],
    });
    console.log({ result });

    // const item = new UserModel({ email, password: hashedPassword });
    // item.save((err, data) => {
    //   console.log(err, data);
    //   console.log(hashedPassword);
    // });

    return result;
  };

  findUserByEmailService = async (email) => {
    await connection;
    const foundUserByEmail = await UserModel.findOne({ email: email });
    return foundUserByEmail;
  };

  updateUserAddressService = async (email, address) => {
    await connection;
    const addressModel = new AddressModel(address);
    const savedUserAddress = await addressModel.save();
    console.log({ savedUserAddress });

    const updatedUserAddressReference = await UserModel.updateOne(
      { email: email },
      { $push: { address: savedUserAddress._id } }
    );
    console.log({ updatedUserAddressReference });
    return { updatedUserAddressReference, savedUserAddress };
  };

  deleteUserAddressService = async (email, id) => {
    await connection;
    const deletedUserAddress = await AddressModel.deleteOne({
      _id: id,
    });
    console.log({ deletedUserAddress });

    const deletedUserAddressReference = await UserModel.updateOne(
      { email: email },
      { $pull: { address: id } }
    );
    console.log({ deletedUserAddressReference });
    return { deletedUserAddress, deletedUserAddressReference };
  };

  getAllUsersSevice = async () => {
    await connection;
    const allUsersData = await UserModel.find({}).populate("address").exec();
    return allUsersData;
  };

  loginService = async (email) =>
    connection.then(() => UserModel.findOne({ email: email }).exec());
}

module.exports = AuthService;
