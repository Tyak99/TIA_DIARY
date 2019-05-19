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

describe('login route test', () => {
  it('should test the login route', (done) => {
    chai
        .request(server)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          const { body } = res
          
          expect(body.status).to.eql(200);
          expect(body.data).to.be.an('object')
          expect(body.data.id).to.be.a('number')

          done();
        });
  });
});

describe('invalid login credentials', () => {
  it('should test for invalid login credentials', (done) => {
    chai
       .request(server)
       .post('/api/v1/auth/login')
       .send(user2)
       .end((err, res) => {
         const { body } = res

         expect(body.status).to.eql(401);
         expect(body.error).to.be.a('string');
         expect(body.error).to.eql('invalid credentials')

         done()
       })
  })
})
