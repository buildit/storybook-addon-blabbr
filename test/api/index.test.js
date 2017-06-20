import proxyquire from 'proxyquire';
import * as slack from '../../src/api/slack';

describe('API', () => {
  const stubDb = { '@noCallThru': true };

  describe('Get Comment', () => {
    const fakeDbFindResponse = {
      docs: [{}, {}]
    };

    const api = proxyquire('../../src/api/index', {
      './db': stubDb
    });

    beforeEach(() => {
      stubDb.find = sinon.stub().resolves(fakeDbFindResponse);
    });

    it('should find comments from the DB', () => {
      return api.getComments('', '').then(() => {
        expect(stubDb.find.calledOnce).to.be.true;
      });
    });

    it('should request comments identified by component and story', () => {
      const expectedComponentName = 'comments';
      const expectedStoryName = 'xxx';

      return api
        .getComments(expectedComponentName, expectedStoryName)
        .then(() => {
          const findArguments = stubDb.find.getCall(0).args;
          const selector = findArguments[0].selector['$and'];

          expect(selector[0].componentId).to.equal(expectedComponentName);
          expect(selector[1].stateId).to.equal(expectedStoryName);
        });
    });

    it('should request comments sorted by ID', () => {
      return api.getComments('', '').then(() => {
        const findArguments = stubDb.find.getCall(0).args;
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
      stubDb.find = sinon.stub().rejects(new Error());

      return api.getComments('', '').then(result => {
        expect(result.success).to.be.false;
        expect(result.msg).to.equal('No comments available.');
      });
    });
  });

  describe('Post Comment', () => {
    const api = proxyquire('../../src/api/index', {
      './db': stubDb
    });
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

    let stubPostSlackComment;

    beforeEach(() => {
      stubDb.put = sinon.stub().resolves({ ok: true });
      stubPostSlackComment = sinon.stub(slack, 'postComment');
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
        expect(stubDb.put.getCall(0).args[0]).to.have.all.keys(expectedKeys);
      });
    });

    it('should mark the comment as new', () => {
      return api.postComment(exampleComment).then(() => {
        const putRecord = stubDb.put.getCall(0).args[0];
        expect(putRecord.edited).to.be.false;
      });
    });

    it('should return successfully if the comment is successfully posted', () => {
      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.true;
      });
    });

    it('should return a failure if the DB does not return an ok', () => {
      stubDb.put = sinon.stub().resolves({ ok: false });

      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.false;
      });
    });

    it('should return a failure if the DB request fails', () => {
      stubDb.put = sinon.stub().rejects(new Error('DB error'));

      return api.postComment(exampleComment).then(result => {
        expect(result.success).to.be.false;
      });
    });

    it('should post a comment to Slack', () => {
      return api.postComment(exampleComment).then(result => {
        expect(stubPostSlackComment).to.have.been.calledOnce;
        stubPostSlackComment.restore();
      });
    });
  });

  describe('Update Comment', () => {
    const api = proxyquire('../../src/api/index', {
      './db': stubDb
    });
    const fakeDbFindResponse = {
      docs: [
        {
          comment: '',
          edited: false,
          lastUpdated: ''
        }
      ]
    };

    let stubEditSlackComment;

    // const exampleComment = {
    //   timestampId: 111,
    //   userName: 'exampleUsername',
    //   userEmail: 'exampleEmail',
    //   userComment: 'Example comment.',
    //   component: 'comments',
    //   story: 'story name',
    //   version: '0.0.1',
    //   eventName: 'exampleEventName'
    // };

    beforeEach(() => {
      stubDb.find = sinon.stub().resolves(fakeDbFindResponse);
      stubDb.put = sinon.stub().resolves({ ok: true });

      stubEditSlackComment = sinon.stub(slack, 'editComment');
    });

    xit('should post an edited comment to Slack', () => {});
  });
});
