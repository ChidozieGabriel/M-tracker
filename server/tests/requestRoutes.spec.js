import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../server';

const Expect = chai.expect;

chai.use(chaiHttp);
global.token = null;
before((done) => {
  chai.request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'example@gmail.com',
      password: '123456',
    })
    .end((err, res) => {
      global.token = res.body.token;
      done();
    });
});
describe('USER REQUEST CONTROLLER API ENDPOINT', () => {
  it('Should not have access to requests on no token GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/')
      .end((err, res) => {
        Expect(err)
          .to
          .be
          .equal(null);
        Expect(res.statusCode)
          .to
          .equal(403);
        done();
      });
  });

  it('Should not have access to requests on invalid token GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/')
      .set({ Authorization: 'Bearer diiiooihweohfowehfohwhioo' })
      .end((err, res) => {
        Expect(err)
          .to
          .be
          .equal(null);
        Expect(res.statusCode)
          .to
          .equal(401);
        done();
      });
  });

  it('Should list ALL requests on /user/request GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(err)
          .to
          .be
          .equal(null);
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
        done();
      });
  });

  it('Should list ALL requests ordered by resolved', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/orderBy/resolved')
      .set({ Authorization: `Bearer ${global.tok}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should list ALL requests ordered by approved', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/orderBy/approved')
      .set({ Authorization: `Bearer ${global.tok}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should list ALL requests ordered by disapproved', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/orderBy/disapproved')
      .set({ Authorization: `Bearer ${global.tok}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should list ALL requests ordered by pending', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/orderBy/pending')
      .set({ Authorization: `Bearer ${global.tok}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should list ONE requests on /user/request/:requestId GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
        Expect(res)
          .to
          .be
          .an('object');
      });
    done();
  });

  it('Should throw a 404 error when request is not found', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests/1100')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  it('should create a SINGLE request user/requests/ POST', (done) => {
    const data1 = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
    };
    chai.request(app)
      .post('/api/v1/users/requests')
      .set({ Authorization: `Bearer ${global.token}` })
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(201);
      });
    done();
  });

  it('should update a SINGLE request on user/requests/:requestId PUT', (done) => {
    const data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
    };
    chai.request(app)
      .put('/api/v1/users/requests/3')
      .set({ Authorization: `Bearer ${global.token}` })
      .send(data)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
      });
    done();
  });

  it('should get an error when a bad request is sent on user/requests/  POST', (done) => {
    const data1 = {
      dept: '',
      request: 'Lorem ipsum owjjfndfnmnxnfj Lorem ipsum Lorem',
    };
    chai.request(app)
      .post('/api/v1/users/requests/')
      .set({ Authorization: `Bearer ${global.token}` })
      .send(data1)
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(400);
      });
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  PUT', (done) => {
    const data = {
      name: 'Janet May',
      dept: 'Engineering HQ',
      request: 'Lorem ipsum owjjfndfnmnxnfj Loremorem',
    };
    chai.request(app)
      .put('/api/v1/users/requests/1100')
      .send(data)
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  it('should get an error when a request is not found on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .delete('/api/v1/users/requests/1110/delete')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(404);
      });
    done();
  });

  it('should delete a request on user/requests/:requestId  DELETE', (done) => {
    chai.request(app)
      .delete('/api/v1/users/requests/2/delete')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(200);
      });
    done();
  });

  it('should not grant access to none admin users', (done) => {
    chai.request(app)
      .get('/api/v1/requests/')
      .set({ Authorization: `Bearer ${global.token}` })
      .end((err, res) => {
        Expect(res.statusCode)
          .to
          .equal(403);
      });
    done();
  });
});

describe('SERVER', () => {
  it('Should return 200 on root Endpoint  ', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        Expect(err)
          .to
          .be
          .equal(null);
        Expect(res.statusCode)
          .to
          .equal(200);
        done();
      });
  });

  it('Should return 404 when an invalid route is entered', (done) => {
    chai.request(app)
      .get('/api/v1/open')
      .end((err, res) => {
        Expect(err)
          .to
          .be
          .equal(null);
        Expect(res.statusCode)
          .to
          .equal(404);
        done();
      });
  });
});
