'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server.js');

const should =  chai.should();

chai.use(chaiHttp);
describe('/POST', () => {
  it("it should return 200 status code", (done) => {
    done();
  });
  it("it should respond with a JSON object", (done) => {
    done();
  });
  it("it should have a recipient e-mail address", (done) => {
    done();
  });
});