const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^click the logo$/, () => {
    return client
        //wait for the bruna logo show
        .waitForElementVisible('.header-logo','the bruna logo is show.')
        .click('.header-logo',function(){
            console.log('click the bruna logo success')
        })
});

Then(/^redirect to homepage$/, () => {
    return client
        //test if the url is the homepage
        .assert.urlEquals(client.globals.brunaHomepage)
});