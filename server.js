'use strict'
const express = require('express');
const secret  = require('./private.js')
const sendgrid = require('sendgrid')(secret.apiKey || process.env.apiKey);

const helper = require('sendgrid').mail;
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Create post request
app.post("/email", (req, res) => {
  //Store info from user to be used for the e-mail
  
  let fromEmail = new helper.Email("Dion.Fulwood@gmail.com");
  let toEmail = new helper.Email(req.body.to);
  let subject = req.body.subject || "Hello from " + fromEmail.email;
  let content = new helper.Content("text/plain", req.body.body);
  //Pass data into Mail constructor
  let mail = new helper.Mail(fromEmail, subject, toEmail, content);
  //Provide formatting example if user does not enter information correctly
  if(toEmail.email === undefined || content === undefined) {
    res.send('Please format your e-mail to be sent as\n{\n\t"to":"myemail@example.com",\n\t"subject": "hello",\n\t"body": "world" \n} \nPlease include values for "to" and "body"');
  }else {
    //Creates structure for request to be sent to sendgrid API
    let request = sendgrid.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sendgrid.API(request, (error, request) => {
      res.send("Your E-mail was successfully sent!")
    });
  }


});



module.exports = app.listen(port, (err)=> {
  if(err) {
    console.log(" ❌ You have recieved the following error: ", err);
  }
  console.log(`🌎 🌍 🌏 Server is listening on port: ${port} 🌏 🌍 🌎`);
});