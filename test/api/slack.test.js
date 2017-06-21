import nock from 'nock';
import * as config from '../../src/utils/config';
import * as slack from '../../src/api/slack';

describe('Slack API', () => {
  describe('Post Comment', () => {
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

    it('should fetch the Slack configuration from the config utility', () => {
      nock(fakeSlackEndpoint).post(fakeSlackPath).reply(200, {});

      return slack.postComment(exampleComment).then(() => {
        expect(stubConfigSlack.calledOnce).to.be.true;
      });
    });
  });
});
