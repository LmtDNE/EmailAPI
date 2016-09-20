const express = require('express');
const bodyParser = require('body-parser');
const secret  = require("./private.js")
const sendgrid = require('sendgrid')(secret.apiKey);

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



module.exports = app.listen(port, (err)=> {
  if(err) {
    console.log(" ❌ You have recieved the following error: ", err);
  }
  console.log(`🌎 🌍 🌏 Server is listening on port: ${port} 🌏 🌍 🌎`);
});