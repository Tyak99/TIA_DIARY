import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;


const newUser = {
  firstName: 'ochowo',
  lastName: 'Ikongbeh',
  email: 'ochowo@gmail.com',
  password: 'password',
  confirmPassword: 'password',
};

const emptyUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const invalidEmail = {
    firstName: 'ochowo',
    lastName: 'Ikongbeh',
    email: 'ochowogmail.com',
    password: 'password',
    confirmPassword: 'password',
  };

describe('Test Signup Route', () => {
  it('it should signup a new user', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.eql(201);
        expect(body.status).to.eql(201);
        expect(body.status).to.be.a('number');
        expect(body).to.have.property('data');
        expect(body).to.have.property('status');
        expect(body).to.be.a('object');
        expect(body.data).to.be.a('array');
      });
  });
  it('it should not signup a new user on empty inputs', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(emptyUser)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.eql(400);
        expect(body.status).to.eql(400);
        expect(body.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body).to.have.property('status');
        expect(body).to.be.a('object');
        expect(body.error).to.be.a('object');
      });
  });
  it('it should not signup a new user if email exists', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.eql(409);
        expect(body.status).to.eql(409);
        expect(body.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body).to.have.property('status');
        expect(body).to.be.a('object');
        expect(body.error).to.be.a('string');
      });
  });
  it('it should not signup a new user if email is invalid', () => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send('invalidEmail')
      .end((err, res) => {
        const { body } = res;
        expect(res.status).to.eql(400);
        expect(body.status).to.eql(400);
        expect(body.status).to.be.a('number');
        expect(body).to.have.property('error');
        expect(body).to.have.property('status');
        expect(body).to.be.a('object');
        expect(body.error).to.be.a('object');
      });
  });
});
