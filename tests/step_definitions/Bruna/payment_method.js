const assert = require('assert');
const {
    client
} = require('nightwatch-cucumber');
const {
    Given,
    Then,
    When
} = require('cucumber');
const cart = require('./modules/cart');


Given(/^the payment method title is shown$/, () => {
    return client
        //verify the payment methods title
        .execute(function () {
            return document.getElementsByTagName('legend')[0].innerText;
        }, [], function (result) {
            client.assert.equal(client.globals.paymentMethodsTitle.indexOf(result.value) > -1, true, 'the payment methods title is correct.')
        })
});

Then(/^the payment option title and icon is show$/, () => {
    return client
        //check the payment options name
        .execute(function () {
            var optionsNameNotEmpty = true;
            var srcNotEmpty = true;
            var options = Array.prototype.slice.call(document.getElementsByClassName('payment-method')).map(function (item) {
                return item.getElementsByTagName('label')[0].innerText;
            })
            for (var index in options) {
                optionsNameNotEmpty = (options[index].length > 0) && optionsNameNotEmpty;
            }
            var srcs = Array.prototype.slice.call(document.getElementsByClassName('payment-method')).map(function (item) {
                return item.getElementsByClassName('payment-icon')[0].firstElementChild.src;
            })
            for (var index in srcs) {
                srcNotEmpty = (srcs[index].length > 0) && srcNotEmpty;
            }
            return {
                paymentOptionsName: optionsNameNotEmpty,
                paymentIconImage: srcNotEmpty
            };
        }, [], function (result) {
            client.assert.equal(result.value.paymentOptionsName, true, 'all the payment option name is not empty.')
            client.assert.equal(result.value.paymentIconImage, true, 'all the payment icon is show.')
        })
});

When(/^choose a payment option and click the next step button$/, () => {
    var chosenOption = client.globals.chosenPaymentOption
    return client
        //choose a payment option,this can be configured in the global.js
        .execute(function (chosenOption) {
            var options = Array.prototype.slice.call(document.getElementsByClassName('payment-method')).map(function (item) {
                return item.getElementsByTagName('label')[0].innerText;
            })
            for (var index in options) {
                if (chosenOption == options[index]) {
                    document.getElementsByClassName('payment-method')[index].getElementsByTagName('label')[0].click();
                    break;
                }
            }
        }, [chosenOption])
        .pause(client.globals.miniWaitTime)
        //click the next button
        .execute(function () {
            document.getElementsByClassName('multi-step-next')[0].getElementsByTagName('a')[0].click();
        })
});

Then(/^chosen payment option will show in the summary in the check out step 4$/, () => {
    client
        //wait for enter the step 4
        .waitForElementVisible('.main-cart-summary', 'enter check out flow step 4 successful.')
        //.pause(client.globals.miniWaitTime)
        //check the payment method summary
        .execute(function () {
            return {
                paymentSummaryTitle: document.getElementsByClassName('payment-methods-summary')[0].getElementsByTagName('h2')[0].innerText,
                paymentSummaryEditButton: document.getElementsByClassName('payment-methods-summary')[0].getElementsByTagName('a')[0].innerText,
                paymentMethod: document.getElementsByClassName('payment-methods-summary')[0].getElementsByClassName('paymentMethod')[0].innerText
            }
        }, [], function (result) {
            console.log(result.value)
            client.assert.equal(client.globals.paymentMethodSummaryTitle.indexOf(result.value.paymentSummaryTitle) > -1, true, 'the payment summary title is correct.')
            client.assert.equal(result.value.paymentSummaryEditButton, client.globals.paymentMethodSummaryEditButton, 'the payment summary edit button is show.')
            client.assert.equal(result.value.paymentMethod, client.globals.chosenPaymentOption, 'the payment method is correct.')
        })
        .pause(client.globals.middleWaitTime)
    //click the next step button
    cart.getCartInfo(client)
    client.execute(function () {
        document.getElementsByClassName('multi-step-next')[0].getElementsByTagName('a')[0].click();
    })
    return client
});