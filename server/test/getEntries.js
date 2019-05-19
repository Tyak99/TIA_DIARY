import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET api/v1/entry ', () => {
  it('should get all user entries', (done) => {
    chai
      .request(server)
      .get('/api/v1/entry')
      .end((err, res) => {
        expect(res.status).to.eql(200);
        expect(res.body.data).to.be.an('array');
        if (res.body.data.length === 0) {
          expect(res.body.message).to.eql('You have no entry');
        } else {
          expect(res.body.message).to.eql('All user entries retrieved');
        }

        done();
      });
  });
});
