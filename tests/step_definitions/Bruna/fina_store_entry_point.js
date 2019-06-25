const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the find store text$/, () => {
    return client
        //verify find store text
        .getText('.header-navigation-right__item',function(result){
            client.assert.equal(result.value,client.globals.findStoreText,'the find store link text is correct.')
        })
});

Then(/^check the find store icon$/, () => {
    return client
        //wait for find store icon
        .waitForElementVisible('.service-block-search-store> a >img','the find store icon is show.')
});

Then(/^check the find store url$/, () => {
    return client
        //verify the url of find store link
        .execute(function(){
            return document.getElementsByClassName('service-block-link')[0].getElementsByTagName('a')[0].href;
        },[],function(result){
            client.assert.equal(result.value,client.globals.findStoreUrl,'the find store link url is correct.')
        })
});