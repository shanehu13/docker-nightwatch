const dotenv = require('dotenv');
require('dotenv').config();

// require('nightwatch-cucumber')({
//   cucumberArgs: [
//     '--require',  process.env.DEFINITION_PATH,
//     '--format', 'node_modules/cucumber-pretty',
//     '--format', 'json:tests/reports/cucumber.json',
//     process.env.FEATURES_PATH
//   ]
// });

module.exports = {
  output_folder: process.env.OUTPUT_FOLDER,
  // custom_assertions_path: ["/app/node_modules/nightwatch-xhr/es5/assertions"],
  // custom_commands_path: ["/app/node_modules/nightwatch-xhr/es5/commands"],
  live_output: true,
  disable_colors: false,
  test_workers: false,
  globals_path : process.env.GLOBAL_JS_PATH,
  page_objects_path : process.env.PAGE_OBJECT_PATH,
  // selenium: {
  //   start_process: true,
  //   server_path: '/app/bin/selenium-server-standalone-3.14.0.jar',
  //   log_path: '',
  //   port: 4444,
  //   cli_args: {
  //     'webdriver.chrome.driver': '/app/bin/chromedriver-linux'
  //   }
  // },
  test_settings: {
    default: {
      launch_url: process.env.LAUNCH_URL,
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'goog:chromeOptions': {
          args: [
            '--window-size=1500,800',
            '--disable-gpu'
          ]
        }
      },
      screenshots : {
        enabled : true,
        on_failure : true,
        path: process.env.SCREENSHOT_PATH
      }
    },
    chrome: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'goog:chromeOptions': {
          args: ['--disable-gpu',
          '--ignore-certificate-errors']
        }
      }
    },
    firefox: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      }
    },
    byIE: {
      launch_url: process.env.LAUNCH_URL,
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'internet explorer',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
      screenshots : {
        enabled : true,
        on_failure : true,
        path: process.env.SCREENSHOT_PATH
      },
      selenium: {
        cli_args: {
          'webdriver.chrome.driver': '/app/bin/IEDriverServer.exe'
        }
      }
    },
  }
};