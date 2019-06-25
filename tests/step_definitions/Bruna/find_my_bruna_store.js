const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the find my bruna store icon$/, () => {
    return client
        //wait for find my bruna store icon
        .waitForElementVisible('img[alt="Icon for store information"]','the find my bruna store icon is show')
});

Then(/^check the find my bruna store title text$/, () => {
    return client
        //verify the find my bruna store title text
        .execute(function(){
            return document.getElementsByClassName('service-block-title')[1].innerText;
        },[],function(result){
            client.assert.equal(result.value,client.globals.findMyBrunaStoreTitle,'The find my bruna store title is correct.')
        })
});

Then(/^check the find my bruna store title url$/, () => {
    return client
        //verify the find my bruna store title text url
        .execute(function(){
            return document.getElementsByClassName('service-block-search-store')[0].getElementsByTagName('a')[0].href;
        },[],function(result){
            client.assert.equal(result.value,client.globals.findMyBrunaStoreUrl,'The find my bruna store title url is correct.')
        })
});

Then(/^check the find my bruna store description$/, () => {
    return client
        //verify the find my bruna store description
        .execute(function(){
            return document.getElementsByClassName('service-block-search-store')[0].getElementsByTagName('p')[0].innerText.split('\n');
        },[],function(result){
            client.assert.equal(result.value[0].replace(/[\r\n]/g, ""),client.globals.findMyBrunaStoreDescription1.replace(/[\r\n]/g, ""),'The find my bruna store url is correct.')
            client.assert.equal(result.value[1].replace(/[\r\n]/g, ""),client.globals.findMyBrunaStoreDescription2.replace(/[\r\n]/g, ""),'The find my bruna store url is correct.')
        })
});

Then(/^check the find my bruna store link text$/, () => {
    return client
        //verify the find my bruna store link text
        .execute(function(){
            return document.getElementsByClassName('service-block-link')[0].getElementsByTagName('a')[0].innerText;
        },[],function(result){
            client.assert.equal(result.value,client.globals.findMyBrunaStoreLinkText,'The find my bruna store link text is correct.')
        })
});

Then(/^check the find my bruna store link url$/, () => {
    return client
        //verify the find my bruna store link url
        .execute(function(){
            return document.getElementsByClassName('service-block-link')[0].getElementsByTagName('a')[0].href;
        },[],function(result){
            client.assert.equal(result.value,client.globals.findMyBrunaStoreLinkUrl,'The find my bruna store link url is correct.')
        })
});