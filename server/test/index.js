import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test All Diary-App Endpoints', () => {
  it('should test the index route', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        done();
      });
  });

  describe('POST/ - Create an entry', () => {
    it('Should return status 201(Created) and a Message object', (done) => {
      const entry = {
        title: 'Wonderful day',
        description: 'I had a very wonderful day, i met the love of my life.',
        userId: 1,
      };

      chai.request(server)
        .post('/api/v1/entries')
        // .set('authorization', userToken)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body).to.have.a.property('data').which.is.an('object');
          expect(res.body.data).to.include.all.keys('id', 'title', 'description');
          done();
        });
    });

    it('Should return status 400(Bad Request) if user input is incomplete.', (done) => {
      const entry = {
        title: 'Wonderful day',
        description: '',
        userId: 2,
      };

      chai.request(server)
        .post('/api/v1/entries')
        // .set('authorization', userToken)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.eql(400);
          expect(res.body).to.have.a.property('error').which.is.an('array');
          expect(res.body.error).to.include('Please enter a description.');
          done();
        });
    });

    it('Should return status 404(Not Found) if user does not exist.', (done) => {
      const entry = {
        title: 'Wonderful day',
        description: 'I had a very wonderful day, i met the love of my life.',
        userId: 200,
      };

      chai.request(server)
        .post('/api/v1/entries')
        // .set('authorization', userToken)
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.eql(404);
          expect(res.body).to.have.a.property('error').which.is.a('string');
          expect(res.body.error).to.eql('User not found.');
          done();
        });
    });

    /*

    it('Should return status 401(Unauthorized) when there is no Token Provided', () => {
      const entry = {
        title: 'Wonderful day',
        description: 'I had a very wonderful day, i met the love of my life.',
        userId: 2,
      };

      chai.request(server)
        .post('/api/v1/entries')
        .send(entry)
        .end((err, res) => {
          expect(res.status).to.eql(401);
          expect(res.body).to.have.a.property('error').which.is.a('string');
          expect(res.body.error).to.eql('No Authentication Token Provided.');
          done();
        });

  */
  });
});
