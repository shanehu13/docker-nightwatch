const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var defaultResult = '';

Given(/^the default filter result is show$/, () => {
    return client
        //wait for the filter result
        .waitForElementVisible('.pull-left','the filter result number is show.')
        .getText('.pull-left',function(result){
            defaultResultNum = result.value
        })
});

Then(/^choose a new brand$/, () => {
    return client
        //choose the first brand in the filter list
        .execute(function(){
            document.getElementById('Merk').getElementsByTagName('span')[0].click();
        })
        .pause(client.globals.middleWaitTime)
});

When(/^click the reset link$/, () => {
    return client
        //click the reset link
        .execute(function(){
            document.getElementsByClassName('clearfilter')[1].click();
        })
        .pause(client.globals.middleWaitTime)
});

Then(/^the filter will be reset$/, () => {
    return client
        //the filter result will return default
        .getText('.pull-left',function(result){
            client.assert.equal(result.value,defaultResultNum,'the filter result is default now.')
        })
        
});