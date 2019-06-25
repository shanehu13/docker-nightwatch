const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

When(/^click the voorwaarden link$/, () => {
    return client
        //wait for the conditions link show
        .waitForElementVisible('.legal-notices','the conditions link is show.')
        .getText('ul[class="legal-notices"] > li:nth-child(1)',function(result){
            client.assert.equal(result.value === client.globals.conditionLinkText,true)
        })
        //click the link
        .click('ul[class="legal-notices"] > li:nth-child(1) > a',function(){
            console.log('click the conditions link success.')
        })
});

Then(/^redirect to the conditions page$/, () => {
    return client
        //test if the url is the condition page
        .assert.urlContains(client.globals.conditionPage)
        .back()
});

When(/^click the Privacy-en Cookiebeleid link$/, () => {
    return client
        //wait for the policy link show
        .waitForElementVisible('.legal-notices','the policy link is show.')
        .getText('ul[class="legal-notices"] > li:nth-child(2)',function(result){
            client.assert.equal(result.value === client.globals.policyCookieLinkText,true)
        })
        //click the link
        .click('ul[class="legal-notices"] > li:nth-child(2)',function(){
            console.log('click the policy link success')
        })
});

Then(/^redirect to the Privacy and Cookie Policy page$/, () => {
    return client
        //test if the url is the policy page
        .assert.urlEquals(client.globals.policyCookiePage)
        .back()
});