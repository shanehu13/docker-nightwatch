const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^check the customer service block icon$/, () => {
    return client
        //wait for customer service block icon
        .waitForElementVisible('.service-block-service > a >img','the customer icon is show')
});

Then(/^check the customer service block title text$/, () => {
    return client
        //verify the service block title text
        .execute(function(){
            return document.getElementsByClassName('service-block-title')[0].innerText;
        },[],function(result){
            client.assert.equal(result.value,client.globals.customerServiceBlockTitle,'The customer service block title is correct.')
        })
});

Then(/^check the customer service block title url$/, () => {
    return client
        //verify the service block title text url
        .execute(function(){
            return document.getElementsByClassName('service-block-service')[0].getElementsByTagName('a')[0].href;
        },[],function(result){
            client.assert.equal(result.value,client.globals.customerServiceBlockUrl,'The customer service block title url is correct.')
        })
});

Then(/^check the customer service block description$/, () => {
    return client
        //verify the service block description
        .execute(function(){
            return document.getElementsByClassName('service-block-service')[0].getElementsByTagName('p')[0].innerText;
        },[],function(result){
            client.assert.equal(result.value.replace(/[\r\n]/g, ""),client.globals.customerServiceBlockDescription.replace(/[\r\n]/g, ""),'The customer service block title url is correct.')
        })
});

Then(/^check the customer service block phone number text$/, () => {
    return client
        //verify the service block phone number text
        .execute(function(){
            return document.getElementsByClassName('service-block-service')[0].getElementsByTagName('a')[1].innerText;
        },[],function(result){
            client.assert.equal(result.value,client.globals.customerServiceBlockPhone,'The customer service block phone number text is correct.')
        })
});

Then(/^check the customer service block phone number url$/, () => {
    return client
        //verify the service block phone number url
        .execute(function(){
            return document.getElementsByClassName('service-block-service')[0].getElementsByTagName('a')[1].href;
        },[],function(result){
            client.assert.equal(result.value,client.globals.customerServiceBlockUrl,'The customer service block phone number url is correct.')
        })
});