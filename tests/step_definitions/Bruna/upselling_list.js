const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Then(/^promoted product list should not be empty$/, () => {
    return client
        .url(client.globals.brunaHomepage)
        //click the fisrt product title to enter pdp page
        .execute(function(){
            document.getElementsByClassName('product-title')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the breadcump show
        .waitForElementVisible('.product-list','the breadcump is show.')
        //verify the product count in the promoted product list
        .execute(function(){
            return document.getElementsByClassName('product-list')[0].children.length;
        },[],function(result){
            client.assert.equal(result.value >= 3,true,'the promoted product list is not empty.')
        })
});

Then(/^the recent view product list should contain the current product$/, () => {
    return client
        //verify if the recent view item is in the recent view list
        .pause(client.globals.middleWaitTime)
        .execute(function(){
            var title = document.getElementsByClassName('product-information')[0].getElementsByClassName('product-title')[0].innerText;
            var result = false;
            var titles = Array.prototype.slice.call(document.getElementsByClassName('recently-viewed-product')).map(function(item){return item.getElementsByClassName('product-title')[0].innerText});
            for(var i in titles){
                if(titles[i] == title){
                    result = true;
                    break;
                }
            }
            return result;
        },[],function(result){
            client.assert.equal(result.value,true,'the recent view product list contains the current product.')
        })
        .pause(client.globals.miniWaitTime)
});