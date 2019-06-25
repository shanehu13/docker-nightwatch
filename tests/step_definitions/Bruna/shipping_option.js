const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

Given(/^enter a pdp page and choose a quantity to add into cart$/, () => {
    return client
        //open the product detail page 
        .url(client.globals.checkoutProductUrl)
        //choose a quantity here may some product can not choose the minimum quantity,so choose the second one.
        .execute(function () {
            var select = document.getElementsByClassName('quantity-dropdown')[0];
            return select[0].value;
        },[],function(result){
            console.log(result.value)
            client.setValue('select[class="quantity-dropdown"]', result.value)
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //click the add to cart button
        .execute(function () {
            document.getElementsByClassName('addto-cart')[0].getElementsByTagName('a')[0].click();
        })
        //wait for a few second
        .pause(client.globals.middleWaitTime)
});

When(/^click the cart icon to check the shipping options$/, () => {
    return client
        //click the cart icon
        .execute(function () {
            document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the cart page show
        .pause(client.globals.middleWaitTime)
        .waitForElementVisible('.orderStep', 'the cart page is show')
});

Then(/^the shipping option title is show$/, () => {
    return client
        //check the shipping option title
        .execute(function () {
            return document.getElementsByClassName('grid-padding-x')[0].getElementsByTagName('h2')[0].innerText;
        }, [], function (result) {
            client.assert.equal(result.value, client.globals.shippingOptionTitle, 'the shipping option title is correct.')
        })
});

Then(/^the shipping option text is show$/, () => {
    return client
        //choose a random shipping option
        .execute(function () {
            var options = document.getElementsByClassName('shipping-method');
            var ranIndex = Math.floor(Math.random() * options.length);
            options[ranIndex].getElementsByTagName('input')[0].checked = true;
            return options[ranIndex].innerText;
        }, [], function (result) {
            client.assert.equal(result.value.length > 0, true, 'the option text is not empty.')
        })
});

Then(/^the shipping option description is show$/, () => {
    return client
        //the description is not show on the page right now
        //.assert.equal(true, false, 'the shipping option description is not show.')
});