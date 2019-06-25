const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var bookname = '';

When(/^recent viewed product list is shown$/, () => {
    return client
        //open the home page
        .url(client.globals.brunaHomepage)
        //wait for promoted product list show
        .waitForElementVisible('.recently-viewed-products','the recent viewed product list is shown.')
});

Then(/^show the message$/, () => {
    return client
        //check the message
        .pause(client.globals.miniWaitTime)
        .execute(function(){
            return document.getElementsByClassName('recently-viewed-clear')[0].getElementsByTagName('a').length > 0;
        },[],function(result){
            if(result.value){
                try {
                    client.click('.clear-all')
                } catch (error) {}
            }else{
                client.getLocationInView(".recently-viewed-products")
                client.getText('.recently-viewed-products',function(result){
                    client.assert.equal(true,result.value.indexOf(client.globals.recentViewedProductTips)!=-1)
                })
            }
        })
});

When(/^view a product and return to homepage$/, () => {
    return client
        //click the product image to view the product detail
        .execute(function(){
            document.getElementsByClassName('product-list')[0].getElementsByTagName('a')[1].click();
            return document.getElementsByClassName('product-list')[0].getElementsByTagName('a')[2].innerText;
        },[],function(result){
            console.log(result.value)
            console.log(bookname)
            bookname = result.value
            console.log(bookname)
        })
        //click logo to return homepage
        .waitForElementVisible('.header-logo','the logo is shown.')
        .pause(client.globals.miniWaitTime)
        .click('.header-logo',function(){
            console.log('click the logo success.')
        })
});

Then(/^the viewed product list will contain the product recent viewed$/, () => {
    var temp
    return client
        //wait for the viewed product list shown
        .waitForElementVisible('.recently-viewed-products','the recent viewed product list is shown.')
        .pause(client.globals.miniWaitTime)
        //verify if the recent viewed product list is contain the product recent viewed.
        .pause(client.globals.miniWaitTime)
        .execute(function(){
            return document.getElementsByClassName('recently-viewed-product-cluster')[0].getElementsByTagName('a')[2].innerText;
        },[],function(result){
            client.assert.equal(bookname,result.value,'the recent viewed product list contain the product viewed recently.')
        })
});