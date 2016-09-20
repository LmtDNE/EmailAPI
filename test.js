'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');

const should =  chai.should();

chai.use(chaiHttp);
describe('/POST', () => {
  it("it should return 200 status code", (done) => {
    chai.request(server)
    .post("/email")
    .end((err, res) => {
      should.not.exist(err);
      res.should.have.status(200);
      done();
    });
  });
  it("it should respond with a JSON object", (done) => {
    chai.request(server)
    .post("/email")
    .send({
      "to": "dion.fulwood@gmail.com",
      "body": "This is an e-mail to be sent"})
    .end((err, res) => {
      let addressObj = res.request._data;
      addressObj.should.be.an.object;
      addressObj.should.have.property("to");
      addressObj.should.have.property("body");
      done();
    });
  });
  it("it should have a recipient e-mail address", (done) => {
    chai.request(server)
    .post("/email")
    .send({
      "to": "dion.fulwood@gmail.com",
      "body": "This is an e-mail to be sent"})
    .end((err, res) => {
      let toAddress = res.request._data.to;
      toAddress.should.be.a.string;
      toAddress.should.not.be.undefined;
      done();
    });
  });
});






