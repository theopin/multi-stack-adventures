// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';


// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Accounts REST API", () => {
    runGetTests();


});

function runGetTests() {
    // describe("GET /", () => {
    //     // Test to get all bank user accounts record
    //     it("should get all bank account users record", (done) => {
    //         chai.request(app)
    //             .get('/accounts/')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });
    //     });
    //     // Test to get single bank user account record
    //     it("should get a single bank account user record", (done) => {
    //         const id = 1;
    //         chai.request(app)
    //             .get(`/accounts/${id}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });
    //     });

    // });
}

function runPostTests() {

}

function runPatchTests() {
    
}