//Import the dependencies for testing
import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import newUsers from './data/newUsers.js'

// Configure chai
chai.use(chaiHttp);
chai.should();

const users = []

describe("Accounts REST API", () => {
    runPostTests();
    runGetTests();
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
    
}

function runDeleteTests() {
    describe("DELETE /", () => {

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