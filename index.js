const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); //if the server recieves some special character like %2 which stands for space.it will read it as space bcoz of this middleware.it is provided by express.we have not given the path here and we are using it on app.so this middleware is for every route

app.use(express.json()); //when we recieve the req from the user.the req may contain body.the body will be in json format.for the server to read it as json we have used this middleware.it is provided by express.we have not given the path here and we are using it on app.so this middleware is for every route

app.use("/", rootRouter); //.use is a utility funtion to attach a middleware.if it takes two args then its special middleware.first argument is the string(path).if found a / go to router.

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
