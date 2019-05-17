import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

chai.use(chaiHttp);

const { expect } = chai;

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
