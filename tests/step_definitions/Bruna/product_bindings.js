const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var bindingIndex;
var url;

When(/^open the detail page of product with bindings$/, () => {
    return client
        //open the product detail page which have bindings
        .url(client.globals.productWithBindingUrl)
});

Then(/^the bindings show correctly$/, () => {
    return client
        //wait for the bindings show
        .waitForElementVisible('#product-bindings','the product bindings show correctly.')
});

Then(/^the bindings title and price show$/, () => {
    return client
        //choose a random binding to check the title and price
        .execute(function(){
            var total = document.getElementsByClassName('product-bindings')[0].getElementsByTagName('li').length;
            var randomBinding = document.getElementsByClassName('product-bindings')[0].getElementsByTagName('li')[Math.floor(Math.random()*total)]
            return randomBinding.getElementsByClassName('binding-title')[0].innerText + '***' + randomBinding.getElementsByClassName('binding-prices')[0].innerText;
        },[],function(result){
            var title = result.value.split('***')[0];
            var price = result.value.split('***')[1];
            client.assert.equal(title.length > 0,true,'the binding title is show.')
            client.assert.equal(price.length > 0,true,'the binding price is show.')
        })
        
});

When(/^click the bindings$/, () => {
    return client

        //click a random binding
        .execute(function(){
            var total = document.getElementsByClassName('product-bindings')[0].getElementsByTagName('li').length;
			var index = Math.floor(Math.random()*total)
            var randomBinding = document.getElementsByClassName('product-bindings')[0].getElementsByTagName('li')[index];
            randomBinding.getElementsByTagName('a')[0].click();
            return index + '***' + randomBinding.getElementsByTagName('a')[0].href;
        },[],function(result){
            bindingIndex = result.value.split('***')[0]
            url = result.value.split('***')[1]
			console.log(bindingIndex)
			console.log(url)
        })
        
});

Then(/^the redirect to another detail page$/, () => {
    var selectedBindingIndex = bindingIndex
    return client
        .pause(client.globals.middleWaitTime)
        //check the url
        .assert.urlEquals(url)
        //check the binding border color
        .execute(function(selectedBindingIndex){
            return window.getComputedStyle(document.getElementsByClassName('product-bindings')[0].getElementsByTagName('li')[selectedBindingIndex].getElementsByTagName('a')[0],null).getPropertyValue('border-color');
        },[selectedBindingIndex],function(result){
            client.assert.equal(result.value,client.globals.bindingBorderColor,'the border style of the selected binding is correct.')
        })
});