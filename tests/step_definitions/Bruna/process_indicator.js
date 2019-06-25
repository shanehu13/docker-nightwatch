const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^open the homepage$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        
});

Then(/^clear the cart$/, () => {
    return client
        //click the cart icon
        .execute(function(){
            document.getElementsByClassName('basket')[0].click();
        })
        .pause(client.globals.miniWaitTime)
        //clear the cart items
        .execute(function(){
            var size = document.querySelectorAll('a[title="Delete"]').length;
            if(size > 0){
                for(i=0;i<size;i++){document.querySelectorAll('a[title="Delete"]')[i].click();}
            }
        })
        //wait for the delete line items finish
        .pause(client.globals.middleWaitTime)
        .getText('.empty',function(result){
            client.assert.equal(client.globals.cartEmptyTips,result.value,'the cart is empty and tips is show.')
        })
        //click the logo to return homepage
        .url(client.globals.brunaHomepage)
        
});

When(/^add a product into cart$/, () => {
    return client
        //click the add to cart button
        .moveToElement('.product',10,10,function(){
            console.log('move to product successful.')
        })
        .pause(client.globals.miniWaitTime)
        //click the add to cart button
        .click('.addto-cart')
        .pause(client.globals.middleWaitTime)
});

Then(/^check the number on cart icon$/, () => {
    return client
        //check the icon number
        .execute(function(){
            return document.getElementsByClassName('minicart-status')[0].getElementsByClassName('count')[0].innerText+'***'+document.getElementsByClassName('product-list')[0].getElementsByTagName('a')[2].innerText;
        },[],function(result){
            console.log(result.value)
            iconNum = result.value.split('***')[0]
            productName = result.value.split('***')[1]
            client.assert.equal('1',iconNum,'the wishlist icon number is correct.')
        })
});

Then(/^click the cart icon$/, () => {
    return client
        //click the cart icon
        .execute(function(){
            document.getElementsByClassName('basket')[0].click();
        })
});

Then(/^check the process indicator$/, () => {
    return client
        //wait for steps indicator
        .pause(client.globals.middleWaitTime)
        .waitForElementVisible('.orderStep','the process indicator is show.')
        .execute(function(){
            return Array.prototype.slice.call(document.querySelectorAll('.orderStep > li')).map(function(item){return window.getComputedStyle(item,":before").content.replace(/[^0-9]/ig,"")+item.innerText.replace('\n','');}).toString();
        },[],function(result){
            client.assert.equal(result.value,client.globals.checkoutProcessIndicator.toString(),'the process indicator is show correct.')
        })
        
});