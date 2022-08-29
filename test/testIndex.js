// Import the dependencies for testing
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Accounts REST API", () => {
    describe("GET /", () => {
        // Test to get all bank user accounts record
        it("should get all bank account users record", (done) => {
             chai.request(app)
                 .get('/accounts/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  })
         });
        // Test to get single bank user account record
        it("should get a single bank account user record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/accounts/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // // Test to get single bank user account record
        // it("should not get a single bank user account record", (done) => {
        //      const id = 5;
        //      chai.request(app)
        //          .get(`/accounts/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(404);
        //              done();
        //           });
        //  });
    });
});