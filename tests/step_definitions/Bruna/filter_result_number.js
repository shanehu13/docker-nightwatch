const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var defaultResultNum = -1;
var resultNumber = -1;
var resultPageCount = -1;

Given(/^the filter result number is show$/, () => {
    return client
        //wait for the filter result number show
        .waitForElementVisible('.pull-left','the filter result number is show.')
        //save the default result number
        .getText('.pull-left',function(result){
            console.log(result.value)
            defaultResultNum = result.value.split(' ')[0]
        })
});

When(/^choose the brand in filter$/, () => {
    return client
        //choose the first brand in the filter list
        .execute(function(){
            document.getElementById('Merk').getElementsByTagName('span')[0].click();
        })
        //need to wait for a few second
        .pause(client.globals.middleWaitTime)
        //save the result number
        .getText('.pull-left',function(result){
            console.log(result.value)
            resultNumber = result.value.split(' ')[0]
        })
        //click the last page
        .execute(function(){
            var pages = document.getElementsByClassName('pagination')[0].getElementsByTagName('li')
            pages[pages.length-2].firstChild.click();
            return pages.length-2;
        },[],function(result){
            resultPageCount = result.value
            console.log('resultPageCount is : '+resultPageCount)
        })
        //need to wait for a few second
        .pause(client.globals.middleWaitTime)
        //caculate the result product number
        .execute(function(){
            return document.getElementsByClassName('product-list')[0].childElementCount;
        },[],function(result){
            console.log(result.value)
            client.assert.equal((parseInt(resultPageCount)-1)*client.globals.plpProductCountPerPage+result.value,resultNumber,'the filter result number is correct.')
        })
});

Then(/^the filter result will change$/, () => {
    return client
        .assert.equal(resultNumber!=defaultResultNum,true,'the filter result is changed.')
});