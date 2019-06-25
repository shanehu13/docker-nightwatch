const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^the hero image banner is shown$/, () => {
    return client
        //return home page and verify the hero image banner is show on the page
        .url(client.globals.brunaHomepage)
        .waitForElementVisible('.hero-image-banner','the hero image banner is show.')
});

Then(/^check the banner text and overlay text$/, () => {
    return client
        //check the banner text
        .getText('.hero-image-banner-quote',function(result){
            client.assert.equal(result.value.replace(/[\r\n]/g, " "),client.globals.heroImageBannerText,'the banner text is correct.')
        })
        //check the CTA text
        .getText('.button',function(result){
            client.assert.equal(result.value,client.globals.heroImageBannerCTAText,'the CTA text is correct.')
        })
});

When(/^click the CTA link text$/, () => {
    return client
        //click the CTA link
        // .click('.button',function(){
        //     console.log('click the CTA text successful')
        // })
        .execute(function(){
            document.getElementsByClassName('button')[0].click();
        })
        //.pause(client.globals.middleWaitTime)
});

Then(/^redirect to the product detail page$/, () => {
    return client
        //verify the product detail page url
        .pause(client.globals.middleWaitTime)
        .assert.urlEquals(client.globals.heroImageBannerCTATextLink)
        .url(client.globals.brunaHomepage)
});

When(/^click the hero image$/, () => {
    return client
        //move mouse to the banner image
        .moveTo('.hero-image-banner',10,10,function(){
            console.log('move mouse to the hero banner image successful.')
        })
        //click the banner image
        .mouseButtonClick(function(){
            console.log('click the banner image successful.')
        })
});