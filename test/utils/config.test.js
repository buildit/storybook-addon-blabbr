import proxyquire from 'proxyquire';

const omit = (obj, keysToOmit = []) => {
  return Object.keys(obj)
    .filter(key => keysToOmit.indexOf(key) < 0)
    .reduce((newObj, key) => {
      return Object.assign(newObj, { [key]: obj[key] });
    }, {});
};

// TODO Now fully covered but the repetition is a smell and the config module should be refactored.
describe('Config', () => {
  const fakeConfigValues = {
    blabbr: {
      db: {
        user: 'ystoymysierenchingetwomm',
        pwd: '5208ae40d25c32c89d4d09136784afe95fa43083',
        host: 'iamtmrobinson.cloudant.com/blabbr'
      },
      slack: {
        endPoint:
          'https://hooks.slack.com/services/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'
      },
      ui: {
        avatar: true
      }
    },
    versions: {
      availableVersions: ['0.0.1'],
      regex: '/([^/]+?)/?$'
    }
  };
  let config;

  beforeEach(() => {
    const stubGetConfig = () => Promise.resolve(fakeConfigValues);
    config = proxyquire.noCallThru().load('../../src/utils/config', {
      './getConfig': stubGetConfig
    });
  });

  describe('Blabbr', () => {
    describe('DB', () => {
      it('should return a Promise', () => {
        expect(config.db()).to.be.a('Promise');
      });

      it('should resolve with the expected value if it is available', () => {
        return config.db().then(response => {
          expect(response).to.equal(fakeConfigValues.blabbr.db);
        });
      });

      it('should resolve will null if no config values are available', () => {
        const configValuesWithoutDb = Object.assign({}, fakeConfigValues, {
          blabbr: omit(fakeConfigValues.blabbr, ['db'])
        });

        const stubGetConfig = () => Promise.resolve(configValuesWithoutDb);
        config = proxyquire.noCallThru().load('../../src/utils/config', {
          './getConfig': stubGetConfig
        });

        return config.db().then(response => {
          expect(response).to.equal(null);
        });
      });

      it('should reject if config is not available', () => {
        const stubGetConfig = () => Promise.reject(new Error());
        config = proxyquire.noCallThru().load('../../src/utils/config', {
          './getConfig': stubGetConfig
        });

        return config.db().should.eventually.be.rejected;
      });
    });

    describe('Slack', () => {
      it('should return a Promise', () => {
        expect(config.slack()).to.be.a('Promise');
      });

      it('should resolve with the expected value if it is available', () => {
        return config.slack().then(response => {
          expect(response).to.equal(fakeConfigValues.blabbr.slack);
        });
      });

      it('should reject if config is not available', () => {
        const stubGetConfig = () => Promise.reject(new Error());
        config = proxyquire.noCallThru().load('../../src/utils/config', {
          './getConfig': stubGetConfig
        });

        return config.slack().should.eventually.be.rejected;
      });
    });

    describe('UI', () => {
      it('should return a Promise', () => {
        expect(config.ui()).to.be.a('Promise');
      });

      it('should resolve with the expected value if it is available', () => {
        return config.ui().then(response => {
          expect(response).to.equal(fakeConfigValues.blabbr.ui);
        });
      });

      it('should reject if config is not available', () => {
        const stubGetConfig = () => Promise.reject(new Error());
        config = proxyquire.noCallThru().load('../../src/utils/config', {
          './getConfig': stubGetConfig
        });

        return config.ui().should.eventually.be.rejected;
      });
    });
  });

  describe('Versions', () => {
    it('should return a Promise', () => {
      expect(config.versions()).to.be.a('Promise');
    });

    it('should resolve with the expected value if it is available', () => {
      return config.versions().then(response => {
        expect(response).to.equal(fakeConfigValues.versions);
      });
    });

    it('should reject if config is not available', () => {
      const stubGetConfig = () => Promise.reject(new Error());
      config = proxyquire.noCallThru().load('../../src/utils/config', {
        './getConfig': stubGetConfig
      });

      return config.versions().should.eventually.be.rejected;
    });
  });
});
