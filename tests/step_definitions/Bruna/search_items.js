const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var homepage = client.page.homepage();
var plp = client.page.plp();

Given(/^open the homepage and input the (.+) and click the search button$/, (keyword) => {
    client.url(client.globals.brunaHomepage)
    homepage.searchItems(keyword)
    return client
});

Then(/^redirect to the search result page$/, () => {
    client.waitForElementVisible('.filter-sidebar-inner')
    return client
});

Then(/^the search result is correct when seach in (.+) with (.+) and (.+)$/, (type, keyword, selector) => {
    plp.verifySeachResultByName(type, selector, client, keyword)
    client.url(client.globals.brunaHomepage)
    return client
});