const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^the promotional banner is shown$/, () => {
    return client
        //wait for promotional banner show
        .url(client.globals.brunaHomepage)
        .waitForElementVisible('.promotion-banner','the promotional banner is shown.')
});

Then(/^check the banner title and subtitle$/, () => {
    return client
        //verify the banner subtitle
        .getText('.promotion-banner-subtitle',function(result){
            console.log(result)
            client.assert.equal(client.globals.promotionalBannerSubtitle,result.value)
        })
        //verify the banner title
        .getText('.promotion-banner-title',function(result){
            client.assert.equal(client.globals.promotionalBannerTitle,result.value)
        })
});

Then(/^check the banner description$/, () => {
    return client
        //verify the banner description
        .getText('.promotion-banner-body',function(result){
            client.assert.equal(client.globals.promotionalBannerDescription,result.value)
        })
});

Then(/^check the banner image$/, () => {
    return client
        //verify the image
        .execute(function(data){
            return document.getElementsByClassName('promotion-banner-image')[0].innerHTML.indexOf('<img');
        },[],function(result){
            client.assert.equal(result.value!=-1,true,'the banner image is shown.')
        })
});

When(/^click the banner CTA link$/, () => {
    return client
        //.maximizeWindow()
        //click the CTA link
        .execute(function(){
            document.getElementsByClassName('promotion-banner-content')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^redirect to the promotional product detail page$/, () => {
    return client
        //verify the promotional banner CTA link
        .assert.urlEquals(client.globals.promotionalBannerLink)
        //back to home page
        .url(client.globals.brunaHomepage)
});