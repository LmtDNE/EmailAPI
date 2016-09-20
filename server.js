'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const secret  = require('./private.js')
const sendgrid = require('sendgrid')(secret.apiKey || process.env.apiKey);
const helper = require('sendgrid').mail;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Create post request
app.post("/email", (res, req) => {
  //Store info from user to be used for the e-mail
  let fromEmail = new.helper.Email("Dion.Fulwood@gmail.com");
  let toEmail = new.helper.Email(req.body.to);
  let subject = req.body.subject || "Hello from " + fromEmail.email;
  let content = new helper.Content("text/plain", req.body.body);
  //Pass data into Mail constructor
  let mail = new helper.Mail(fromEmail, subject, toEmail, content);


});



module.exports = app.listen(port, (err)=> {
  if(err) {
    console.log(" ❌ You have recieved the following error: ", err);
  }
  console.log(`🌎 🌍 🌏 Server is listening on port: ${port} 🌏 🌍 🌎`);
});