const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^the usp show$/, () => {
    return client
        //wait for the ups link show
        .waitForElementVisible(".linklist",'the usp link is shown.')
        //verify the usp link text
        .assert.containsText(".linklist", client.globals.uspLinkText1)
        .assert.containsText(".linklist", client.globals.uspLinkText2)
        .assert.containsText(".linklist", client.globals.uspLinkText3)
});

Then(/^the customer service link show$/, () => {
    return client
        .waitForElementVisible('.usp-links-list__service','the Klantenservice link is show.')
});

Then(/^the bruna folder link show$/, () => {
    return client
        //.assert.equal(true,false,'the bruna folder link is not exist.')
});