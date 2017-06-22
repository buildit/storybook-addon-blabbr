import nock from 'nock';
import * as config from '../../src/utils/config';
import * as slack from '../../src/api/slack';

describe('Slack API', () => {
  let stubConfigSlack;

  const exampleComment = {};
  const fakeSlackEndpoint = 'https://expected.url';
  const fakeSlackPath = '/zzz';

  beforeEach(() => {
    stubConfigSlack = sinon.stub(config, 'slack').resolves({
      endPoint: `${fakeSlackEndpoint}${fakeSlackPath}`
    });
  });

  afterEach(() => {
    stubConfigSlack.restore();
  });

  describe('Post Comment', () => {
    it('should fetch the Slack configuration from the config utility', () => {
      nock(fakeSlackEndpoint).post(fakeSlackPath).reply(200, {});

      return slack.postComment(exampleComment).then(() => {
        expect(stubConfigSlack.calledOnce).to.be.true;
      });
    });

    it('should return success true if the request to Slack is successful', () => {
      nock(fakeSlackEndpoint).post(fakeSlackPath).reply(200, {});

      return slack.postComment(exampleComment).then(data => {
        expect(data.success).to.be.true;
      });
    });

    it('should return success false if the response from Slack is not ok', () => {
      nock(fakeSlackEndpoint).post(fakeSlackPath).reply(403, {});

      return slack.postComment(exampleComment).then(data => {
        expect(data.success).to.be.false;
      });
    });
  });

  describe('Edit Comment', () => {
    it('should fetch the Slack configuration from the config utility', () => {
      nock(fakeSlackEndpoint).post(fakeSlackPath).reply(200, {});

      return slack.editComment(exampleComment).then(() => {
        expect(stubConfigSlack.calledOnce).to.be.true;
      });
    });
  });
});
