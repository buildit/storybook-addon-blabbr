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
          comment: 'Example original comment.',
          edited: false,
          lastUpdated: '1497955939598'
        }
      ]
    };

    let clock;
    let exampleEditComment;
    let stubEditSlackComment;

    beforeEach(() => {
      clock = sinon.useFakeTimers(Date.now());

      stubDb.find = sinon.stub().resolves(fakeDbFindResponse);
      stubDb.put = sinon.stub().resolves({ ok: true });

      stubEditSlackComment = sinon.stub(slack, 'editComment');

      exampleEditComment = {
        commentId: 1,
        component: 'comments',
        userName: 'exampleUsername',
        userEmail: 'exampleEmail',
        userCommentText: 'Example edited comment.'
      };
    });

    afterEach(() => {
      clock.restore();
      stubEditSlackComment.restore();
    });

    it('should find the comment in the DB that matches the provided ID', () => {
      return api.updateComment(exampleEditComment).then(() => {
        const { selector: findSelector } = stubDb.find.getCall(0).args[0];

        expect(findSelector).to.eql({
          _id: exampleEditComment.commentId
        });
      });
    });

    it('should return a failure if there was a problem finding the existing comment', () => {
      stubDb.find.rejects(new Error());

      return api.updateComment(exampleEditComment).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal('There was an error editing your comment.');
      });
    });

    it('should store the newly edited comment', () => {
      return api.updateComment(exampleEditComment).then(() => {
        const record = stubDb.put.getCall(0).args[0];

        expect(record.comment).to.equal(exampleEditComment.userCommentText);
      });
    });

    it('should mark the comment as edited', () => {
      return api.updateComment(exampleEditComment).then(() => {
        const record = stubDb.put.getCall(0).args[0];

        expect(record.edited).to.be.true;
      });
    });

    it('should update the comments last updated time with the time now', () => {
      const expectedTime = new Date().getTime();

      return api.updateComment(exampleEditComment).then(() => {
        const record = stubDb.put.getCall(0).args[0];

        expect(record.lastUpdated).to.equal(`${expectedTime}`);
      });
    });

    it('should return successfully if the comment was edited', () => {
      return api.updateComment(exampleEditComment).then(data => {
        expect(data.success).to.be.true;
        expect(data.msg).to.equal('Your comment was edited successfully.');
      });
    });

    it('should return an error message if the comment is empty', () => {
      exampleEditComment.userCommentText = '';

      return api.updateComment(exampleEditComment).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal('Cannot update with empty comment.');
      });
    });

    it('should return a failure if there was a problem saving the edited comment', () => {
      stubDb.put.rejects(new Error());

      return api.updateComment(exampleEditComment).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal(
          'There was an error saving your edited comment.'
        );
      });
    });

    it('should post an edited comment to Slack', () => {
      return api.updateComment(exampleEditComment).then(data => {
        expect(stubEditSlackComment.calledOnce).to.be.true;
      });
    });
  });

  describe('Delete Comment', () => {
    const api = proxyquire('../../src/api/index', {
      './db': stubDb
    });
    const exampleCommentId = '111';
    const fakeDbFindResponse = {
      docs: [
        {
          _id: exampleCommentId,
          comment: 'Example original comment.',
          edited: false,
          lastUpdated: '1497955939598'
        }
      ]
    };

    beforeEach(() => {
      stubDb.find = sinon.stub().resolves(fakeDbFindResponse);
      stubDb.put = sinon.stub().resolves({ ok: true });
    });

    it('should find the comment in the DB that matches the provided ID', () => {
      return api.deleteComment(exampleCommentId).then(() => {
        const { selector: findSelector } = stubDb.find.getCall(0).args[0];

        expect(findSelector).to.eql({
          _id: exampleCommentId
        });
      });
    });

    it('should mark the comment as deleted', () => {
      return api.deleteComment(exampleCommentId).then(() => {
        const record = stubDb.put.getCall(0).args[0];

        expect(record._deleted).to.be.true;
      });
    });

    it('should return successfully if the comment was deleted', () => {
      return api.deleteComment(exampleCommentId).then(data => {
        expect(data.success).to.be.true;
        expect(data.msg).to.equal('Your comment was removed successfully.');
      });
    });

    it('should return a failure if there was a problem finding the comment', () => {
      const errorMessage = '[DB ERROR MESSAGE]';

      stubDb.find.rejects(new Error(`${errorMessage}`));

      return api.deleteComment(exampleCommentId).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal(
          `There was a problem deleting your comment. Not found. Error: ${errorMessage}`
        );
      });
    });

    it('should return a failure if no comment records are returned', () => {
      stubDb.find.resolves({ docs: [] });

      return api.deleteComment(exampleCommentId).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal(
          'There was a problem deleting your comment. Not found. Error: No documents returned.'
        );
      });
    });

    it('should return a failure if there was a problem deleting the comment', () => {
      const errorMessage = '[DB ERROR MESSAGE]';

      stubDb.put.rejects(new Error(`${errorMessage}`));

      return api.deleteComment(exampleCommentId).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal(
          `There was a problem deleting your comment. Error: ${errorMessage}`
        );
      });
    });

    it('should return a failure if the DB does not return an ok when deleting the comment', () => {
      stubDb.put.resolves({ ok: false });

      return api.deleteComment(exampleCommentId).then(data => {
        expect(data.success).to.be.false;
        expect(data.msg).to.equal(
          'There was a problem deleting your comment. Error: Deletion unsuccessful.'
        );
      });
    });
  });
});
