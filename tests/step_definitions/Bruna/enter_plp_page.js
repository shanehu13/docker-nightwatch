const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open homepage and click the Bekijk alles link$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        //click the Bekijk alles link
        .click('.link-forward',function(){
            console.log('click the Bekijk alles link successful.')
        })
        //wait for the filter show
        .waitForElementVisible('.filter-sidebar','filter bar is show.')
});