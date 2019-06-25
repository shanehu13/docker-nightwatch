const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');

var shippingFee;
var totalLineItemPrice;
var tax = 0;

Given(/^choose a shipping option$/, () => {
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


        //choose a shipping option with price
        .execute(function () {
            var prices = Array.prototype.slice.call(document.getElementsByClassName('shipping-method')).map(function (item) {
                return item.getElementsByClassName('price')[0].innerText
            });
            var choosenIndex = 0;
            for (var index in prices) {
                if (prices[index].charAt(0) == '€') {
                    choosenIndex = index;
                    break;
                }
            }
            document.getElementsByClassName('shipping-method')[choosenIndex].getElementsByTagName('label')[0].click();
            return {
                optionIndex: choosenIndex,
                optionPrice: document.getElementsByClassName('shipping-method')[choosenIndex].getElementsByClassName('price')[0].innerText
            }
        }, [], function (result) {
            console.log('shipping fee is '+ result.value.optionPrice)
            shippingFee = result.value.optionPrice
        })
        //caculate all the line item price
        .execute(function () {
            var itemPrices = Array.prototype.slice.call(document.getElementsByClassName('price-wrapper')).map(function (item) {
                return item.innerText.replace(/[\r\n]/g, "").substring(1).replace(/\./g,'').replace(/\,/g,'.').trim();
            });
            var totalPrice = 0;
            for (var index in itemPrices) {
                totalPrice = (Math.round(parseFloat(totalPrice) * 100) / 100) + (Math.round(parseFloat(itemPrices[index]) * 100) / 100);
            }
            return totalPrice;
        }, [], function (result) {
            console.log('totalLineItemPrice is '+ result.value)
            totalLineItemPrice = result.value
        })
        .pause(client.globals.middleWaitTime)
});

Then(/^the product price in the summary show correct$/, () => {
    return client
        .pause(client.globals.miniWaitTime)
        //verify the product total price
        .execute(function () {
            return document.getElementsByClassName('sub-total')[0].children[1].innerText;
        }, [], function (result) {
            console.log('actual total line item price is ' + result.value)
            client.assert.equal(result.value.substring(1).substring(1).replace(/\./g,'').replace(/\,/g,'.').trim(), totalLineItemPrice, 'The total line item price is correct.')
        })
});

Then(/^the shipping fee in the summary show correct$/, () => {
    return client
        //verify the shipping fee
        .execute(function () {
            return document.getElementsByClassName('shipping')[0].children[1].innerText;
        }, [], function (result) {
            console.log('actual shipping fee is ' + result.value)
            shippingFee = totalLineItemPrice < parseFloat(client.globals.freeShippingThreshold)?shippingFee:'Gratis'
            client.assert.equal(result.value, shippingFee, 'The shipping fee is correct.')
        })
});

Then(/^the tax in the summary show correct$/, () => {
    return client
    //this function is not finished
});

Then(/^the order total price is correct$/, () => {
    return client
        //verify the total price in the summary
        .execute(function () {
            return document.getElementsByClassName('grand-total')[0].children[1].innerText.substring(1).replace(/\./g,'').replace(/\,/g,'.').trim();
        }, [], function (result) {
            console.log(Math.round(parseFloat(result.value) * 100) / 100)
            console.log(Math.round((parseFloat(shippingFee == 'Gratis' ? '0' : shippingFee.substring(1).replace(/\./g,'').replace(/\,/g,'.').trim()) + parseFloat(totalLineItemPrice) + parseFloat(tax)) * 100) / 100)
            client.assert.equal(Math.round(parseFloat(result.value) * 100) / 100, Math.round((parseFloat(shippingFee == 'Gratis' ? '0' : shippingFee.substring(1)) + parseFloat(totalLineItemPrice) + parseFloat(tax)) * 100) / 100, 'the total order price is correct.')
        })
});

Then(/^the giftcode option show correctly$/, () => {
    return client
        //click the Kortingscode arrow
        .execute(function () {
            document.getElementsByClassName('coupon-label')[0].click()
        })
        //wait for a few second
        .pause(client.globals.miniWaitTime)
        //the Kortingscode text box will show
        .execute(function () {
            return document.getElementsByClassName('apply-coupon').length;
        }, [], function (result) {
            client.assert.equal(result.value > 0, true, 'Kortingscode text will show')
        })
});