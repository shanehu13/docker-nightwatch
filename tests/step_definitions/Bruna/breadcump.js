const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open homepage and click a product image$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        //click the fisrt product title to enter pdp page
        .execute(function(){
            document.getElementsByClassName('product-title')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the breadcump show
        .pause(client.globals.middleWaitTime)
        .waitForElementVisible('.breadcrumbs','the breadcump is show.')
});

Then(/^the breadcump is show correct$/, () => {
    //check the breadcump length at least >= 1
    return client
    .execute(function(){
        return document.getElementsByClassName('breadcrumb')[0].getElementsByTagName('li').length;
    },[],function(result){
        client.assert.equal(result.value >= 1,true,'the bread cump is show correctly.')
    })
});