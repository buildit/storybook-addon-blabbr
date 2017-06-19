import proxyquire from 'proxyquire';

describe('API', () => {
  describe('Get Comment', () => {
    let stubDbFind;
    let api;

    beforeEach(() => {
      stubDbFind = sinon.stub().returns(Promise.resolve());

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

    xit('should return expected data when DB query is successful', () => {
      return api.getComments('', '').then(result => {
        expect(result.success).to.be.true;
        expect();
      });
    });
  });
});
