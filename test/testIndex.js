//Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import newUsers from './data/newUsers.js'

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect
const users = []

describe("Accounts REST API", () => {
    runPostTests();
    runGetTests();
    runPatchTests();
    runDeleteTests();
});



function runPostTests() {
    describe("POST /", () => {
        it("should create a new account", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[0])
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    users.push({_id: res.body.response._id, token: null})
                    done();
                });
        });

        it("should not create a duplicate account", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[0])
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should create a second new account", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[1])
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    users.push({_id: res.body.response._id, token: null})
                    done();
                });
        });
        
        it("should not accept missing params", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[2])
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not accept invalid pincode value", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[3])
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not accept invalid balance", (done) => {
            chai.request(app)
                .post('/accounts/')
                .type('form')
                .send(newUsers[4])
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not authenticate an account with invalid credentials", (done) => {
            chai.request(app)
                .post('/accounts/auth')
                .type('form')
                .send({username: newUsers[0].username, password: newUsers[0].password} + 'aaa')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it("should authenticate an account", (done) => {
            chai.request(app)
                .post('/accounts/auth')
                .type('form')
                .send({username: newUsers[0].username, password: newUsers[0].password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    users[0].token = res.body.response.token
                    done();
                });
        });


        it("should authenticate a second account", (done) => {
            chai.request(app)
                .post('/accounts/auth')
                .type('form')
                .send({username: newUsers[1].username, password: newUsers[1].password})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    users[1].token = res.body.response.token
                    done();
                });
        });

        it("should logout an account", (done) => {
            chai.request(app)
                .post('/accounts/logout')
                .set({ "Authorization": `Bearer ${users[0].token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not accept invalidated tokens", (done) => {
            chai.request(app)
                .post('/accounts/logout')
                .set({ "Authorization": `Bearer ${users[0].token}` })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

}

function runGetTests() {
    describe("GET /", () => {

        it("should not get all bank account users without authorization", (done) => {
            chai.request(app)
                .get('/accounts/')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should get all bank account users record", (done) => {
            chai.request(app)
                .get('/accounts/')
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not get a single bank account user record without authorization", (done) => {
            chai.request(app)
                .get(`/accounts/${users[1]._id}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it("should not get a account of a user with an invalid id", (done) => {
            chai.request(app)
                .get(`/accounts/63296d56175956500b2e9804`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should get a single bank account user record", (done) => {
            chai.request(app)
                .get(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}


function runPatchTests() {
    describe("PATCH /", () => {

        it("should not update balance of a single bank account user record without authorization", (done) => {
            chai.request(app)
                .patch(`/accounts/${users[1]._id}`)
                .type('form')
                .send({change: 50})
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not update balance of a user with an invalid id", (done) => {
            chai.request(app)
                .patch(`/accounts/63296d56175956500b2e9804`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .type('form')
                .send({change: 50})
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // test for excessive withdrawals
        it("should not decrease a single bank account user record beyond current balance", (done) => {
            chai.request(app)
                .patch(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .type('form')
                .send({change: -5000})
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should decrease a single bank account user record", (done) => {
            chai.request(app)
                .patch(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .type('form')
                .send({change: -50})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.response.balance).to.equal(50);
                    done();
                });
        });

        it("should increase a single bank account user record", (done) => {
            chai.request(app)
                .patch(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .type('form')
                .send({change: 100})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body.response.balance).to.equal(150);
                    done();
                });
        });


    });
}

function runDeleteTests() {
    describe("DELETE /", () => {

        it("should not delete a single bank account user record without authorization", (done) => {
            chai.request(app)
                .delete(`/accounts/${users[0]._id}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not delete account of a user with an invalid id", (done) => {
            chai.request(app)
                .delete(`/accounts/63296d56175956500b2e9804`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });


        it("should delete a single bank account user record", (done) => {
            chai.request(app)
                .delete(`/accounts/${users[0]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should delete a single bank account user record", (done) => {
            chai.request(app)
                .delete(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it("should not be able to utilize its token", (done) => {
            chai.request(app)
                .delete(`/accounts/${users[1]._id}`)
                .set({ "Authorization": `Bearer ${users[1].token}` })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
}