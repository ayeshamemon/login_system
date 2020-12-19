class AuthController {
  login = (req, res) => {
    const emailToValidate = req.body.email;
    const emailRegexp = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (emailRegexp.test(emailToValidate)) {
      console.log("valid");
      res.status(200).send({ message: "success" });
    } else {
      console.log("not valid");
      res.status(400).send({ message: "Please enter a valid email address" });
    }
  };
}

module.exports = AuthController;
