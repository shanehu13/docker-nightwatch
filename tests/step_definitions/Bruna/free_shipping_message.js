const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var quantity;

Given(/^add product into cart and enter the cart$/, () => {
    return client
        //open the product detail page 
        .url(client.globals.checkoutProductUrl)
        //choose a quantity here may some product can not choose the minimum quantity,so choose the second one.
        .execute(function (quantityType) {
            //choose a random quantity amoung the top 10 options in the quantity dropdown list
            var ranIndex = Math.floor(Math.random() * 10);
            return document.getElementsByClassName('quantity-dropdown')[0][ranIndex].value;
        }, [], function (result) {
            console.log(result.value)
            quantity = result.value
            console.log(quantity)
            //only use setValue can trigger the script in the page
            client.setValue('select[class="quantity-dropdown"]', quantity)
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //click the add to cart button
        .execute(function () {
            document.getElementsByClassName('addto-cart')[0].getElementsByTagName('a')[0].click();
        })
        //wait for a few second
        .pause(client.globals.middleWaitTime)
        //click the cart icon
        .execute(function () {
            document.getElementsByClassName('minicart-status')[0].getElementsByTagName('a')[0].click();
        })
        //wait for the cart page show
        .waitForElementVisible('.orderStep', 'the cart page is show')
        //choose the first shipping method
        .execute(function () {
            document.getElementsByClassName('shipping-method')[0].getElementsByTagName('label')[0].click();
        })
        .pause(client.globals.middleWaitTime)
});

Then(/^the free shipping message show correctly$/, () => {
    var threshold = client.globals.freeShippingThreshold
    return client
        //verify if the message show correct
        .execute(function (threshold) {
            var temp = threshold - parseFloat(document.getElementsByClassName('sub-total')[0].children[1].innerText.substring(1));
            return {
                freeShippingAmount: temp < 0 ? 0 : temp.toFixed(2),//Math.round(temp * 100) / 100,
                realFreeShippingMessage: document.getElementsByClassName('main-cart-free-shipping')[0].innerText.replace(/[\r\n]/g, "")
            }
        }, [threshold], function (result) {
            console.log(result.value.freeShippingAmount)
            if(result.value.freeShippingAmount == 0){
                client.assert.equal(result.value.realFreeShippingMessage, '', 'the free shipping message is correct.')
            }else{
                client.assert.equal(result.value.realFreeShippingMessage, client.globals.freeShippingMessageTemplate.replace('<price>', result.value.freeShippingAmount), 'the free shipping message is correct.')
            }
        })
});