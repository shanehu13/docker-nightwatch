const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open the home page$/, () => {
    return client
        .maximizeWindow()
        //open the home page
        .url(client.launch_url)
});

When(/^click the category name$/, () => {
    return client
        //wait for the category link show
        .waitForElementVisible('body > header > div > nav > ul > li > ul > li.submenu > a')
        //move mouse to the category link
        .click('body > header > div > nav > ul > li > ul > li.submenu > a',function(){
            console.log('move to the link success.')
        })
        .setValue('#mini-search','123')
});

Then(/^show the subcategory list$/, () => {
    return client
        .waitForElementVisible('body > header > div > nav > ul > li > ul > li.submenu > ul > li:nth-child(1) > a')
        .getText('body > header > div > nav > ul > li > ul > li.submenu > ul > li:nth-child(1) > a', function (result) {
            console.log(result.value)
        })
        
        .pause(client.globals.middleWaitTime)
});
