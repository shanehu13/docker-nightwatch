const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
var iconNum;

When(/^click the add to wishlist button in pdp page$/, () => {
    return client
    //open the homepage
    .url(client.globals.brunaHomepage)
    
    //click the random product title to enter pdp page
    .execute(function(){
        var len = document.getElementsByClassName('product').length;
        document.getElementsByClassName('product-title')[Math.floor(Math.random()*len)].getElementsByTagName('a')[0].click();
    })
    .pause(client.globals.middleWaitTime)
    //verify the icon number before click the add to wishlist button
    .execute(function(){
        var countLen =  document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count').length;
        if(countLen > 0){
            return document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count')[0].innerText;
        }
        return '0';
    },[],function(result){
        iconNum = result.value
    })
    //wait for the add to wishlist button
    .execute(function(){
        return document.getElementsByClassName('product-information')[0].getElementsByClassName('btn-wishlist').length;
    },[],function(result){
        client.assert.equal(result.value > 0,true,'the add to wishlist button is exist.')
    })
    //click the add to wishlist button
    .execute(function(){
        document.getElementsByClassName('product-information')[0].getElementsByClassName('btn-wishlist')[0].click();
    })
    //wait for a few second
    .pause(client.globals.middleWaitTime)
});

Then(/^the wishlist icon number will plus one$/, () => {
    return client
    //verify the icon number on the wishlist icon
    .execute(function(){
        var countLen =  document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count').length;
        if(countLen > 0){
            return document.getElementsByClassName('miniwishlist-status')[0].getElementsByClassName('count')[0].innerText;
        }
        return '0';
    },[],function(result){
        console.log('after click ' + result.value)
        console.log('before click ' + iconNum)
        client.assert.equal(parseInt(result.value) == parseInt(iconNum)+1,true,'the wishlist icon number is correct.')
        iconNum = result.value
    })
});

When(/^click the wishlist icon$/, () => {
    return client
    .click('.view-wishlist',function(){
        console.log('click the wishlist icon on the header successful.')
    })
});

Then(/^the product is in the wishlist page$/, () => {
    return client
    .waitForElementVisible('.account-content','the wishlist page title is show.')
    .execute(function(){
        return document.getElementsByClassName('products')[0].childElementCount;
    },[],function(result){
        //here only verify the count,casue the function on the page is not complete.
        client.assert.equal(result.value == iconNum,true,'the product count in the wishlist is correct.')
    })
});