module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  jasmineNodeOpts: { defaultTimeoutInterval: 60000 },
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        'ignore-certificate-errors',
        `proxy-server=127.0.0.1:3333`,
        'disable-extensions',
        'disable-plugins',
        '--headless',
      ],
    },
  },
  onPrepare() {
    browser.ignoreSynchronization = true;
  },
};
