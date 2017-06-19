import proxyquire from 'proxyquire';

import * as slack from '../../src/api/slack';

describe('API', () => {
  describe('Get Comment', () => {
    const fakeDbFindResponse = {
      docs: [{}, {}]
    };

    let stubDbFind;
    let api;

    beforeEach(() => {
      stubDbFind = sinon.stub().resolves(fakeDbFindResponse);

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

  describe('Post Comment', () => {
    let stubPostSlackComment;

    const exampleComment = {
      timestampId: 111,
      userName: 'exampleUsername',
      userEmail: 'exampleEmail',
      userComment: 'Example comment.',
      component: 'comments',
      story: 'story name',
      version: '0.0.1',
      eventName: 'exampleEventName'
    };

    let stubDbPut;
    let api;

    beforeEach(() => {
      stubPostSlackComment = sinon.stub(slack, 'postComment');

      stubDbPut = sinon.stub().returns(Promise.resolve({ ok: true }));

      api = proxyquire('../../src/api/index', {
        './db': {
          put: stubDbPut,
          '@noCallThru': true
        }
      });
    });

    afterEach(() => {
      stubPostSlackComment.restore();
    });

    it('should save the expected record shape to the DB', () => {
      const expectedKeys = [
        '_id',
        'userName',
        'userEmail',
        'componentId',
        'comment',
        'timestamp',
        'stateId',
        'version',
        'edited',
        'lastUpdated',
        'eventName'
      ];

      api.postComment(exampleComment).then(() => {
        expect(stubDbPut.getCall(0).args[0]).to.have.all.keys(expectedKeys);
      });
    });

    it('should mark the comment as new', () => {
      return api.postComment(exampleComment).then(() => {
        const putRecord = stubDbPut.getCall(0).args[0];
        expect(putRecord.edited).to.be.false;
      });
    });

    it('should return successfully if the comment is successfully posted', () => {
      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.true;
      });
    });

    it('should return a failure if the DB does not return an ok', () => {
      stubDbPut = sinon.stub().resolves({ ok: false });

      api = proxyquire('../../src/api/index', {
        './db': {
          put: stubDbPut,
          '@noCallThru': true
        }
      });

      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.false;
      });
    });

    it('should return a failure if the DB request fails', () => {
      stubDbPut = sinon.stub().rejects(new Error('DB error'));

      api = proxyquire('../../src/api/index', {
        './db': {
          put: stubDbPut,
          '@noCallThru': true
        }
      });

      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.false;
      });
    });

    it('should post a comment to Slack', () => {
      return api.postComment(exampleComment).then(result => {
        expect(stubPostSlackComment).to.have.been.calledOnce;
      });
    });
  });

  describe('Update Comment', () => {});
});
