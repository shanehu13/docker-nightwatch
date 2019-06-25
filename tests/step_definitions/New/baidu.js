const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');

Given(/^I open Baidu's search page$/, async () => {
  await client.url('https://www.baidu.com');
  await client.waitForElementVisible('#form',60000);
});

Then(/^the title is "([^"]*)"$/, async title => {
  await client.assert.title(title);
});

Then(/^the Baidu search form exists$/, async () => {
  await client.waitForElementVisible('#form');
});