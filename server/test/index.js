import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const user = {
  email: 'mattimobolaji@gmail.com',
  password: 'december'
}

const user2 = {
  email: 'mattimobolaji@gmail.com',
  passowrd: 'dece'
}

describe('Index page test', () => {
  it('should test the index route', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('Test signup route', () => {
  it('should signup a user', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eql(201);
        done();
      });
  });
});
