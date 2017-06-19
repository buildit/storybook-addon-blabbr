import proxyquire from 'proxyquire';

describe('API', () => {
  describe('Get Comment', () => {
    const fakeDbFindResponse = {
      docs: [{}, {}]
    };

    let stubDbFind;
    let api;

    beforeEach(() => {
      stubDbFind = sinon.stub().returns(Promise.resolve(fakeDbFindResponse));

      api = proxyquire('../../src/api/index', {
        './db': {
          find: stubDbFind,
          '@noCallThru': true
        }
      });
    });

    it('should find comments from the DB', () => {
      return api.getComments('', '').then(() => {
        expect(stubDbFind.calledOnce).to.be.true;
      });
    });

    it('should request comments identified by component and story', () => {
      const expectedComponentName = 'comments';
      const expectedStoryName = 'xxx';

      return api
        .getComments(expectedComponentName, expectedStoryName)
        .then(() => {
          const findArguments = stubDbFind.getCall(0).args;
          const selector = findArguments[0].selector['$and'];

          expect(selector[0].componentId).to.equal(expectedComponentName);
          expect(selector[1].stateId).to.equal(expectedStoryName);
        });
    });

    it('should request comments sorted by ID', () => {
      return api.getComments('', '').then(() => {
        const findArguments = stubDbFind.getCall(0).args;
        const { sort } = findArguments[0];

        expect(sort[0]).to.include({ _id: 'desc' });
      });
    });

    it('should return expected data when DB query is successful', () => {
      return api.getComments('', '').then(result => {
        expect(result.success).to.be.true;
        expect(result.docs.length).to.equal(fakeDbFindResponse.docs.length);
      });
    });

    it('should return expected message when DB query is unsuccessful', () => {
      stubDbFind = sinon.stub().returns(Promise.reject());

      api = proxyquire('../../src/api/index', {
        './db': {
          find: stubDbFind,
          '@noCallThru': true
        }
      });

      return api.getComments('', '').then(result => {
        expect(result.success).to.be.false;
        expect(result.msg).to.equal('No comments available.');
      });
    });
  });
});
